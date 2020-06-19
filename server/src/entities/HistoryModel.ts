import * as crypto from 'crypto';
import { IHistorySchema, Mongoose } from 'videx/server/mongodb';
import IHistory from './IHistory';

export default class HistoryModel implements IHistory {
  private document_: IHistorySchema;

  constructor(document) {
    this.document_ = document;
  }

  public getCounter(): number {
    return this.document_.counter;
  }

  public getDate(): Date {
    return this.document_.date;
  }

  public getPlayhead(): number {
    return this.document_.playhead;
  }

  public async setPlayhead(playhead: number): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'History',
      this.document_._id,
      {
        $set: {
          playhead: playhead
        }
      }
    );
  }

  public getId() {
    return this.document_._id;
  }

  private static getId(userId: string, lessonId: string) {
    return crypto
      .createHash('sha256')
      .update(userId + lessonId)
      .digest('hex');
  }

  public async setAccess(): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'History',
      this.document_._id,
      {
        $inc: {
          counter: 1
        },
        $set: {
          date: new Date()
        }
      }
    );
  }

  public static async create(
    userId: string,
    lessonId: string
  ): Promise<HistoryModel> {
    await Mongoose.create('History', {
      _id: HistoryModel.getId(userId, lessonId),
      userId: userId,
      lessonId: lessonId,
      counter: 0,
      date: null,
      playhead: null,
      views: []
    });
    return await HistoryModel.findById(userId, lessonId);
  }

  public static async remove(filter: object): Promise<void> {
    await Mongoose.remove('History', filter);
  }

  public static async findById(
    userId: string,
    lessonId: string
  ): Promise<HistoryModel> {
    const document = await Mongoose.findById(
      'History',
      HistoryModel.getId(userId, lessonId)
    );
    return document ? new HistoryModel(document) : null;
  }

  public static async findByLessonId(lessonId: string): Promise<any> {
    const document = await Mongoose.find('History', { lessonId: lessonId });
    return document;
  }

  public getViews(): { start: number; end: number; counter: number }[] {
    return this.document_.views;
  }

  public async setViews(
    views: { start: number; end: number; counter: number }[]
  ): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'History',
      this.document_._id,
      {
        $set: {
          views
        }
      }
    );
  }
}
