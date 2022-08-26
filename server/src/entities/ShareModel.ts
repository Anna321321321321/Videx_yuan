import * as config from 'config';
import * as crypto from 'crypto';
import { IShareSchema, Mongoose } from 'videx/server/mongodb';
import { Crypto } from 'videx/server/utilities';
import IShare from './IShare';
import AnnotationModel from './AnnotationModel';

export default class ShareModel implements IShare {
  private document_: IShareSchema = null;

  constructor(document) {
    this.document_ = document;
  }

  public toObject(): {
    id: string;
    userId: string;
    lessonId: string;
    link: string;
    annoations: string[];
    accessedBy: string[];
  } {
    return {
      id: this.document_.id,
      userId: this.document_.userId,
      lessonId: this.document_.lessonId,
      link: this.document_.link,
      annoations: this.document_.annoations,
      accessedBy: this.document_.accessedBy,
    };
  }

  private static getId(userId: string, lessonId: string) {
    const avoidDup = lessonId;
    return crypto
      .createHash('sha256')
      .update(userId + lessonId + avoidDup)
      .digest('hex');
  }

  public static async create(
    userId: string,
    lessonId: string
  ): Promise<IShare> {
    const id = ShareModel.getId(userId, lessonId);
    var _link: string = Crypto.randomId(8);
    var _annoations: string[] = (
      await AnnotationModel.find(userId, lessonId)
    ).map((document) => document.toObject().id);
    // const document_ = await Mongoose.find('Share', { link: _link });
    // while (document_.length !== 0) _link = Crypto.randomId(8);
    await Mongoose.create('Share', {
      _id: id,
      userId,
      lessonId,
      link: _link,
      annoations: _annoations,
      accessedBy: [],
    });
    return await ShareModel.findBySingleId(id);
  }

  private static async findBySingleId(id: string): Promise<IShare> {
    const document = await Mongoose.findById('Share', id);
    return document == null ? null : new ShareModel(document);
  }
  public static async findByDoubleId(
    userId: string,
    lessonId: string
  ): Promise<IShare> {
    const idFind = ShareModel.getId(userId, lessonId);
    const document = await Mongoose.findById('Share', idFind);
    return document == null ? null : new ShareModel(document);
  }
  public static async findOneByLink(link: string): Promise<any> {
    const document = await Mongoose.findOne('Share', {
      link,
    });
    return document ? new ShareModel(document) : null;
  }
  public static async findByLink(link: string): Promise<any> {
    const document = await Mongoose.find('Share', {
      link: link,
    });
    return document.length === 0 ? null : document;
  }
  public static async getLink(
    userId: string,
    lessonId: string
  ): Promise<IShare> {
    const idFind = ShareModel.getId(userId, lessonId);
    const document = await Mongoose.findById('Share', idFind);
    return document.toObject().link;
  }
  public async addAccessor1(link: string, accessorId: string): Promise<void> {
    const documentFirstFind = await Mongoose.find('Share', {
      link: link,
    });
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Share',
      documentFirstFind[0].toObject().id,
      {
        $addToSet: {
          accessedBy: accessorId,
        },
      }
    );
    return this.document_.id;
  }
  public async addAccessor(accessorId: string): Promise<void> {
    this.document_ = await await Mongoose.findByIdAndUpdate(
      'Share',
      this.document_.id,
      {
        $addToSet: {
          accessedBy: accessorId,
        },
      }
    );
  }
  public getAccessor(): Array<string> {
    return this.document_.accessedBy;
  }
}
