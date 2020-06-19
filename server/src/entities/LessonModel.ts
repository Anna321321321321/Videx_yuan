import { ILessonSchema, LessonStatus, Mongoose } from 'videx/server/mongodb';
import ILesson from './ILesson';

export default class LessonModel implements ILesson {
  private document_: ILessonSchema;

  constructor(document) {
    this.document_ = document;
  }

  public getCourseId(): string {
    return this.document_.courseId;
  }

  public getPreview(): string {
    return (
      this.document_.thumbnail.url +
      '000001.jpg' +
      '?' +
      this.document_.thumbnail.sas
    );
  }

  public async setReleaseDate(releaseDate: Date): Promise<void> {
    this.document_ = await Mongoose.findOneAndUpdate(
      'Lesson',
      {
        _id: this.document_._id
      },
      {
        $set: {
          releaseDate: releaseDate
        }
      }
    );
  }

  public async setCategory(category: string): Promise<void> {
    this.document_ = await Mongoose.findOneAndUpdate(
      'Lesson',
      {
        _id: this.document_._id
      },
      {
        $set: {
          category: category
        }
      }
    );
  }

  public async setPublish(publish: boolean): Promise<void> {
    this.document_ = await Mongoose.findOneAndUpdate(
      'Lesson',
      {
        _id: this.document_._id
      },
      {
        $set: {
          publish: publish
        }
      }
    );
  }

  public getReleaseDate(): Date {
    return this.document_.releaseDate;
  }

  public getCategory(): string {
    return this.document_.category;
  }

  public getPublish(): boolean {
    return this.document_.publish;
  }

  public getId(): string {
    return this.document_.id;
  }

  public getDuration(): number {
    return this.document_.duration;
  }

  public getStatus(): LessonStatus {
    return this.document_.status;
  }

  public getSummary(): string {
    return this.document_.summary;
  }

  public getJobId(): string {
    return this.document_.azure.jobId;
  }

  public getEncodingAssetId(): string {
    return this.document_.azure.assetsId.encodingAssetId;
  }

  public getIndexAssetId(): string {
    return this.document_.azure.assetsId.indexAssetId;
  }

  public getInputAssetId(): string {
    return this.document_.azure.assetsId.inputAssetId;
  }

  public getOfflineAssetId(): string {
    return this.document_.azure.assetsId.offlineAssetId;
  }

  public getThumbnailAssetId(): string {
    return this.document_.azure.assetsId.thumbnailAssetId;
  }

  public async setVideo(streaming: string, offline: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_._id,
      {
        $set: {
          'video.streaming': streaming,
          'video.download': offline
        }
      }
    );
  }

  public async setSummary(summary: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          summary: summary
        }
      }
    );
  }

  public getName(): string {
    return this.document_.name;
  }

  public async setName(name: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          name: name
        }
      }
    );
  }

  public async setTranscriptText(transcript: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'transcript.text': transcript
        }
      }
    );
  }

  public async setTranscriptFile(url: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'transcript.file': url
        }
      }
    );
  }

  public getTranscriptText(): string {
    return this.document_.transcript.text;
  }

  public async setThumbnail(
    url: string,
    height: number,
    width: number,
    sas: string
  ): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'thumbnail.url': url,
          'thumbnail.height': height,
          'thumbnail.width': width,
          'thumbnail.sas': sas
        }
      }
    );
  }

  public async setStatus(status: number): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          status: status
        }
      }
    );
  }

  public async setTranscriptFileUrl(url: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'transcript.file': url
        }
      }
    );
  }

  public getTranscriptFileUrl(): string {
    return this.document_.transcript.file;
  }

  public static async create(
    id: string,
    name: string,
    courseId: string,
    summary: string,
    duration: number,
    releaseDate: Date,
    category: string
  ) {
    await Mongoose.create('Lesson', {
      _id: id,
      name: name,
      courseId: courseId,
      summary: summary,
      status: LessonStatus.Undefined,
      category: category,
      releaseDate: releaseDate,
      keywords: [],
      publish: false,
      duration: duration,
      azure: {
        jobId: null,
        assetsId: {
          inputAssetId: null,
          encodingAssetId: null,
          indexAssetId: null,
          thumbnailAssetId: null,
          offlineAssetId: null
        }
      },
      video: {
        streaming: null,
        download: null
      },
      transcript: {
        text: null,
        file: null
      },
      thumbnail: {
        url: null,
        height: null,
        width: null,
        sas: null
      }
    });
    return await LessonModel.findById(id);
  }

  public async setInputAssetId(assetsId: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'azure.assetsId.inputAssetId': assetsId
        }
      }
    );
  }

  public async setJobId(jobId: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'azure.jobId': jobId
        }
      }
    );
  }

  public async del(): Promise<void> {
    await Mongoose.findByIdAndRemove('Lesson', this.document_.id);
    this.document_ = null;
  }

  private cue2seconds_(cue: string) {
    const times = cue.split(':');
    const hours = times[0];
    const minutes = times[1];
    const seconds = times[2];
    const time =
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseFloat(seconds);
    return Number(time.toFixed(3));
  }

  private transcript2object_() {
    const lines = this.document_.transcript.text
      .split('\n')
      .filter(line => line !== '');
    const result = [];
    for (let i = 0; i < lines.length; ) {
      const timestamps = lines[i].split(' --> ');
      if (timestamps.length === 2) {
        const tmp = {
          start: this.cue2seconds_(timestamps[0]),
          end: this.cue2seconds_(timestamps[1]),
          text: null
        };
        i += 1;
        tmp.text = lines[i];
        result.push(tmp);
      }
      i += 1;
    }
    return result;
  }

  public toObject() {
    return {
      id: this.document_._id,
      name: this.document_.name,
      summary: this.document_.summary,
      releaseDate: this.document_.releaseDate,
      category: this.document_.category,
      publish: this.document_.publish,
      duration: this.document_.duration,
      transcript: {
        text: this.transcript2object_(),
        file: this.document_.transcript.file
      },
      video: {
        streaming: this.document_.video.streaming,
        download: this.document_.video.download
      },
      thumbnail: {
        url: this.document_.thumbnail.url,
        height: this.document_.thumbnail.height,
        width: this.document_.thumbnail.width,
        sas: this.document_.thumbnail.sas
      }
    };
  }

  public async setEncodingAssetId(id: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'azure.assetsId.encodingAssetId': id
        }
      }
    );
  }

  public async setIndexAssetId(id: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'azure.assetsId.indexAssetId': id
        }
      }
    );
  }

  public async setThumbnailAssetId(id: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'azure.assetsId.thumbnailAssetId': id
        }
      }
    );
  }

  public async setOfflineAssetId(id: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Lesson',
      this.document_.id,
      {
        $set: {
          'azure.assetsId.offlineAssetId': id
        }
      }
    );
  }

  public async setViews(views: number[]): Promise<void> {
    await Promise.all(
      views.map(async view => {
        await Mongoose.bulkWrite('Lesson', [
          {
            updateOne: {
              filter: {
                _id: this.document_._id,
                'views._id': {
                  $ne: view
                }
              },
              update: {
                $addToSet: {
                  views: {
                    _id: view,
                    counter: 0
                  }
                }
              }
            }
          },
          {
            updateOne: {
              filter: {
                _id: this.document_._id,
                'views._id': view
              },
              update: {
                $inc: {
                  'views.$.counter': 1
                }
              }
            }
          }
        ]);
      })
    );
  }

  public getViews(): { counter: number; start: number; end: number }[] {
    return this.document_.views
      .reduce((aggregator, value) => {
        if (typeof aggregator[value._id] !== 'undefined') {
          aggregator[value._id] += value.counter;
        } else {
          aggregator[value._id] = value.counter;
        }
        return aggregator;
      }, [])
      .reduce((aggregator, counter, index) => {
        if (typeof counter !== 'undefined') {
          if (aggregator.length === 0) {
            aggregator.push({
              counter,
              start: index,
              end: index
            });
          } else {
            const last = aggregator.pop();
            if (counter === last.counter && index - last.end === 1) {
              last.end = index;
              aggregator.push(last);
            } else {
              aggregator.push(last);
              aggregator.push({
                counter,
                start: index,
                end: index
              });
            }
          }
        }
        return aggregator;
      }, []);
  }

  public static async find(filter: object): Promise<ILesson[]> {
    const documents: ILessonSchema[] = <ILessonSchema[]>(
      await Mongoose.find('Lesson', filter)
    );
    return documents.map(document => new LessonModel(document));
  }

  public static async findById(id: string): Promise<ILesson> {
    const document: any = await Mongoose.findById('Lesson', id);
    return document ? new LessonModel(document) : null;
  }
}
