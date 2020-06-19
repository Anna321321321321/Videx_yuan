import * as config from 'config';
import * as crypto from 'crypto';
import { ILinkSchema, Mongoose } from 'videx/server/mongodb';
import { Crypto } from 'videx/server/utilities';
import ILink from './ILink';

export default class LinkModel implements ILink {
  private document_: ILinkSchema = null;

  constructor(document) {
    this.document_ = document;
  }

  public getLink(): string {
    const query =
      this.document_.start && this.document_.end
        ? `?start=${this.document_.start}&end=${this.document_.end}`
        : '';
    return `/course/${this.document_.courseId}/lesson/${
      this.document_.lessonId
    }${query}`;
  }

  public toObject(): {
    start: number;
    end: number;
    lessonId: string;
    courseId: string;
  } {
    return {
      start: this.document_.start,
      end: this.document_.end,
      lessonId: this.document_.lessonId,
      courseId: this.document_.courseId
    };
  }

  public getToken() {
    return this.document_.token;
  }

  private static getId(
    courseId: string,
    lessonId: string,
    start: number,
    end: number
  ) {
    return crypto
      .createHash('sha256')
      .update(courseId + lessonId + start + end)
      .digest('hex');
  }

  public static async create(
    courseId: string,
    lessonId: string,
    start: number,
    end: number
  ): Promise<ILink> {
    const token: string = Crypto.randomId(8);
    const id = LinkModel.getId(courseId, lessonId, start, end);
    await Mongoose.create('Link', {
      _id: id,
      courseId,
      lessonId,
      start,
      end,
      token
    });
    return await LinkModel.findById(id);
  }

  private static async findById(id: string): Promise<ILink> {
    const document = await Mongoose.findById('Link', id);
    return document == null ? null : new LinkModel(document);
  }

  public static async findOne(
    courseId: string,
    lessonId: string,
    start: number,
    end: number
  ): Promise<ILink> {
    const document = await Mongoose.findById(
      'Link',
      LinkModel.getId(courseId, lessonId, start, end)
    );
    return document == null ? null : new LinkModel(document);
  }

  public static async findByToken(token: string): Promise<ILink> {
    const document = await Mongoose.findOne('Link', { token });
    return document ? new LinkModel(document) : null;
  }
}
