import * as crypto from 'crypto';
import { IReactionSchema, Mongoose } from 'videx/server/mongodb';
import IReaction from './IReaction';

export default class ReactionModel implements IReaction {
  private document_: IReactionSchema = null;

  constructor(document) {
    this.document_ = document;
  }

  public getId(): string {
    return this.document_._id;
  }

  public static getId(userId: string, annotationId: string) {
    return crypto
      .createHash('sha256')
      .update(userId + annotationId)
      .digest('hex');
  }

  public static async find(annotationId: string): Promise<ReactionModel[]> {
    const documents: IReactionSchema[] = <IReactionSchema[]>(
      await Mongoose.find('Reaction', { annotationId })
    );
    return documents.map(document => new ReactionModel(document));
  }

  public static async findByIds(
    userId: string,
    annotationId: string
  ): Promise<ReactionModel> {
    const document = await Mongoose.findById(
      'Reaction',
      ReactionModel.getId(userId, annotationId)
    );
    return document ? new ReactionModel(document) : null;
  }

  public static async findByIdsAndRemove(
    userId: string,
    annotationId: string
  ): Promise<void> {
    await Mongoose.findByIdAndRemove(
      'Reaction',
      ReactionModel.getId(userId, annotationId)
    );
  }

  public static async remove(filter: object): Promise<void> {
    await Mongoose.remove('Reaction', filter);
  }

  public static async create(
    userId: string,
    annotationId: string
  ): Promise<ReactionModel> {
    const id = ReactionModel.getId(userId, annotationId);
    await Mongoose.create('Reaction', {
      _id: id,
      annotationId: annotationId,
      userId: userId
    });
    return await ReactionModel.findByIds(userId, annotationId);
  }
}
