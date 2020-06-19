import { LessonStatus } from 'videx/api';
import {
  IMediaAssetsManager,
  MediaAssetsManager
} from 'videx/server/cloud/media-assets-manager';
import { ILesson, LessonModel } from 'videx/server/entities';
import log from 'videx/server/log';
import ILessonManager from './ILessonManager';

export default class LessonManager implements ILessonManager {
  private readonly id: string;
  private lesson: ILesson;
  private mediaAssetsManager: IMediaAssetsManager;

  public async create(
    name: string,
    courseId: string,
    summary: string,
    duration: number,
    transcript,
    file,
    releaseDate: Date,
    category: string
  ): Promise<void> {
    log.trace('info', 'LessonManager request create', { id: this.id });
    if (this.lesson) {
      throw new Error('lesson exit');
    }
    this.lesson = await LessonModel.create(
      this.id,
      name,
      courseId,
      summary,
      duration,
      releaseDate,
      category
    );
    if (transcript) {
      await this.transcriptSaveSync(transcript, true, false);
    }
    const { inputAssetId, jobId } = await this.mediaAssetsManager.create(
      this.id,
      file
    );
    await this.lesson.setInputAssetId(inputAssetId);
    await this.lesson.setJobId(jobId);
    log.trace('info', 'LessonManager create complete', { id: this.id });
  }

  public async transcriptSaveSync(
    transcript: string,
    save: boolean,
    sync: boolean
  ): Promise<void> {
    log.trace('info', 'LessonManager request transcriptSaveSync', {
      id: this.id
    });
    if (save) {
      await this.lesson.setTranscriptText(transcript);
    }
    if (sync) {
      await this.mediaAssetsManager.string2blob(
        transcript,
        this.lesson.getIndexAssetId(),
        /.*\.vtt$/
      );
    }
    log.trace('info', 'LessonManager transcriptSaveSync complete', {
      id: this.id
    });
  }

  public async del(): Promise<void> {
    log.trace('info', 'LessonManager request del', { id: this.id });
    await this.mediaAssetsManager.deleteAsset(this.lesson.getInputAssetId());
    await this.mediaAssetsManager.deleteAsset(this.lesson.getIndexAssetId());
    await this.mediaAssetsManager.deleteAsset(this.lesson.getEncodingAssetId());
    await this.mediaAssetsManager.deleteAsset(
      this.lesson.getThumbnailAssetId()
    );
    await this.mediaAssetsManager.deleteAsset(this.lesson.getOfflineAssetId());
    await this.lesson.del();
    log.trace('info', 'LessonManager del complete', { id: this.id });
  }

  private async setAssetIds_(): Promise<void> {
    log.trace('info', 'LessonManager request setAssetIds_');
    const {
      indexAssetId,
      encodingAssetId,
      thumbnailAssetId,
      offlineAssetId
    } = await this.mediaAssetsManager.getJobOutputs(this.lesson.getJobId());
    await this.lesson.setEncodingAssetId(encodingAssetId);
    await this.lesson.setIndexAssetId(indexAssetId);
    await this.lesson.setOfflineAssetId(offlineAssetId);
    await this.lesson.setThumbnailAssetId(thumbnailAssetId);
    log.trace('info', 'LessonManager setAssetIds_ complete');
  }

  private async processOthers_(state: LessonStatus): Promise<void> {
    log.trace('info', 'LessonManager request processOthers_');
    await this.setStatus_(state);
    log.trace('info', 'LessonManager processOthers_ complete');
  }

  private async setStatus_(state: LessonStatus): Promise<void> {
    await this.lesson.setStatus(state);
  }

  private async processFinished_(): Promise<void> {
    log.trace('info', 'LessonManager request processFinished_');
    await this.setAssetIds_();
    await this.processVideos_();
    await this.processTranscript_();
    await this.processThumbnail_();
    await this.setStatus_(LessonStatus.Finished);
    log.trace('info', 'LessonManager processFinished_ complete');
  }

  private async processVideos_(): Promise<void> {
    log.trace('info', 'LessonManager request processVideos_');
    const streamingUrl = await this.mediaAssetsManager.findCreateStreamingUrl(
      this.lesson.getEncodingAssetId(),
      /.*\.ism$/,
      '/manifest(format=m3u8-aapl)'
    );
    const offlineUrl = await this.mediaAssetsManager.findCreateDownloadUrl(
      this.lesson.getOfflineAssetId(),
      /.*\.mp4$/
    );
    // need to cast http to https
    await this.lesson.setVideo(
      streamingUrl.replace(/^http:\/\//g, 'https://'),
      offlineUrl
    );
    log.trace('info', 'LessonManager processVideos_ complete');
  }

  private async processThumbnail_(): Promise<void> {
    log.trace('info', 'LessonManager request processThumbnail_');
    const previewUrl = await this.mediaAssetsManager.createDownloadUrl(
      this.lesson.getThumbnailAssetId(),
      '000001.jpg'
    );
    const links = previewUrl.split('000001.jpg?');
    await this.lesson.setThumbnail(links[0], 360, 480, links[1]);
    log.trace('info', 'LessonManager processThumbnail_ complete');
  }

  private async processTranscript_(): Promise<void> {
    log.trace('info', 'LessonManager request processTranscript_');
    const fileUrl = await this.mediaAssetsManager.findCreateDownloadUrl(
      this.lesson.getIndexAssetId(),
      /.*\.vtt$/
    );
    if (this.lesson.getTranscriptText()) {
      await this.transcriptSaveSync(
        this.lesson.getTranscriptText(),
        false,
        true
      );
    } else {
      const transcript = await this.mediaAssetsManager.blob2string(
        this.lesson.getIndexAssetId(),
        /.*\.vtt$/
      );
      await this.transcriptSaveSync(transcript, true, true);
    }
    await this.lesson.setTranscriptFile(fileUrl);
    log.trace('info', 'LessonManager processTranscript_ complete');
  }

  private async processError_(): Promise<void> {
    log.trace('info', 'LessonManager processError_ request');
    await this.setAssetIds_();
    await this.del();
    log.trace('info', 'LessonManager processError_ complete');
  }

  public async postProcess(state: LessonStatus, jobId: string): Promise<void> {
    log.trace('info', 'LessonManager request postProcess', {
      state: state.toString(),
      jobId
    });
    switch (state) {
      case LessonStatus.Queued:
      case LessonStatus.Scheduled:
      case LessonStatus.Processing:
        await this.setStatus_(state);
        break;
      case LessonStatus.Finished:
        await this.processFinished_();
        break;
      case LessonStatus.Error:
        await this.del();
        break;
      default:
        throw new Error(`unexpect job state: ${state}`);
    }
    log.trace('info', 'LessonManager postProcess complete', {
      state: state.toString(),
      jobId
    });
  }

  constructor(
    id: string,
    lesson: ILesson,
    mediaAssetsManager: IMediaAssetsManager
  ) {
    this.id = id;
    this.lesson = lesson;
    this.mediaAssetsManager = mediaAssetsManager;
  }

  public static async create(id: string) {
    return new LessonManager(
      id,
      await LessonModel.findById(id),
      await MediaAssetsManager.create()
    );
  }
}
