import * as fse from 'fs-extra';
import * as path from 'path';
import {
  AzureCloudService,
  ICloudService
} from 'videx/server/cloud/cloud-service';
import log from 'videx/server/log';
import IMediaAssetsManager from './IMediaAssetsManager';

export default class MediaAssetsManager implements IMediaAssetsManager {
  private cloud: ICloudService;

  public constructor(cloud: ICloudService) {
    this.cloud = cloud;
  }

  public async create(
    name: string,
    file
  ): Promise<{ inputAssetId: string; jobId: string }> {
    let inputAsset;
    try {
      log.trace('info', 'MediaManager request create', { name });
      inputAsset = await this.cloud.media.createInputAsset(name);
      const assetFileId: string = await this.cloud.media.createInputAssetFile(
        name,
        file.mimeType,
        inputAsset.id
      );
      await this.cloud.blob.createBlockBlobFromLocalFile(
        inputAsset.containerId,
        name,
        file.path
      );
      await this.cloud.media.updateInputAssetFile(
        name,
        inputAsset.id,
        assetFileId,
        file.size
      );
      const standardMediaProcessorId: string = await this.cloud.media.getMediaProcessor(
        'Media Encoder Standard'
      );
      const indexMediaProcessorId: string = await this.cloud.media.getMediaProcessor(
        'Azure Media Indexer 2 Preview'
      );
      const notificationEndPoint = await this.cloud.notification.createQueueNotificationEndPoint(
        name,
        await this.cloud.queue.createQueueIfNotExists()
      );
      const mediaServiceJobId = await this.cloud.media.createJob(
        name,
        inputAsset.location,
        indexMediaProcessorId,
        standardMediaProcessorId,
        notificationEndPoint.id
      );
      log.trace('info', 'MediaManager create complete', { name });
      return {
        inputAssetId: inputAsset.id,
        jobId: mediaServiceJobId
      };
    } catch (e) {
      if (inputAsset) {
        await this.deleteAsset(inputAsset.id);
      }
      throw new Error('MediaManager create error');
    }
  }

  public static async create(): Promise<MediaAssetsManager> {
    const cloud = await AzureCloudService.create();
    return new MediaAssetsManager(cloud);
  }

  public async string2blob(
    input: string,
    assetId: string,
    regex: RegExp
  ): Promise<void> {
    let localDir;
    try {
      log.trace('verbose', 'MediaManager request string2blob', { assetId });

      const container: string = this.cloud.media.assetId2container(assetId);
      const file = await this.cloud.blob.search(container, regex);

      // create and write input to local file
      localDir = path.join('/app/temp', container);
      const localFile = path.join('/app/temp', container, file);
      await fse.outputFile(localFile, input);

      // send the new file to azure
      await this.cloud.blob.deleteBlobIfExists(container, file);
      await this.cloud.blob.createBlockBlobFromLocalFile(
        container,
        file,
        localFile
      );

      log.trace('verbose', 'MediaManager string2blob complete', { assetId });
      return;
    } finally {
      // clean up
      if (localDir) {
        await fse.remove(localDir);
      }
    }
  }

  public async blob2string(assetId: string, regex: RegExp): Promise<string> {
    let localDir;
    try {
      log.trace('info', 'MediaManager request blob2string', { assetId });
      const container = this.cloud.media.assetId2container(assetId);
      const file = await this.cloud.blob.search(container, regex);

      // create local directory
      localDir = path.join('/app/tmp', assetId);
      await fse.ensureDir(localDir);

      // download file to local
      await this.cloud.blob.getBlobToLocalFile(
        container,
        file,
        path.join(localDir, file)
      );

      // read file & return
      const data = fse.readFileSync(path.join(localDir, file), 'utf8').trim();
      log.trace('info', 'MediaManager blob2string complete', { assetId });
      return data;
    } finally {
      if (localDir) {
        await fse.remove(localDir);
      }
    }
  }

  public async save2blob(
    assetId: string,
    name: string,
    file: string
  ): Promise<void> {
    log.trace('info', 'MediaManager request save2blob', {
      assetId,
      name,
      file
    });
    const container = this.cloud.media.assetId2container(assetId);
    await this.cloud.blob.createBlockBlobFromLocalFile(container, name, file);
    log.trace('info', 'MediaManager save2blob complete', {
      assetId,
      name,
      file
    });
  }

  public async getJobOutputs(
    jobId: string
  ): Promise<{
    indexAssetId: string;
    encodingAssetId: string;
    thumbnailAssetId: string;
    offlineAssetId: string;
  }> {
    log.trace('verbose', 'MediaManager request getJobOutputs');
    const jobOutputs = await this.cloud.media.getJobOutputs(jobId);
    const indexAssetId = jobOutputs[0].id;
    const encodingAssetId = jobOutputs[1].id;
    const thumbnailAssetId = jobOutputs[2].id;
    const offlineAssetId = jobOutputs[3].id;
    log.trace('verbose', 'MediaManager getJobOutputs complete');
    return {
      indexAssetId,
      encodingAssetId,
      thumbnailAssetId,
      offlineAssetId
    };
  }

  public async deleteAsset(assetId: string): Promise<void> {
    log.trace('info', 'MediaManager request deleteAsset', { assetId });
    await this.cloud.media.deleteAsset(assetId);
    log.trace('info', 'MediaManager deleteAsset complete', { assetId });
  }

  public async findCreateDownloadUrl(
    assetId: string,
    fileRegExp: RegExp
  ): Promise<string> {
    log.trace('info', 'MediaManager request findCreateDownloadUrl', {
      assetId
    });
    const container = await this.cloud.media.assetId2container(assetId);
    const file = await this.cloud.blob.search(container, fileRegExp);
    const url = await this.cloud.media.createDownloadUrl(assetId, file);
    log.trace('info', 'MediaManager findCreateDownloadUrl complete', {
      assetId
    });
    return url;
  }

  public async createDownloadUrl(
    assetId: string,
    file: string
  ): Promise<string> {
    log.trace('info', 'MediaManager request createDownloadUrl', { assetId });
    const url = await this.cloud.media.createDownloadUrl(assetId, file);
    log.trace('info', 'MediaManager createDownloadUrl complete', {
      assetId
    });
    return url;
  }

  public async findCreateStreamingUrl(
    assetId: string,
    fileRegExp: RegExp,
    postfix: string
  ): Promise<string> {
    log.trace('info', 'MediaManager request findCreateStreamingUrl', {
      assetId
    });
    const container = await this.cloud.media.assetId2container(assetId);
    const file = await this.cloud.blob.search(container, fileRegExp);
    const url = await this.cloud.media.createStreamingUrl(
      assetId,
      `${file}${postfix}`
    );
    log.trace('info', 'MediaManager findCreateStreamingUrl complete', {
      assetId
    });
    return url;
  }
}
