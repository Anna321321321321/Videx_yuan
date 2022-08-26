import * as uuid from 'uuid';
import {
  IAnnotationSchema,
  Mongoose,
  AnnotationSchema
} from 'videx/server/mongodb';
import IAnnotation from './IAnnotation';

export default class AnnotationModel implements IAnnotation {
  private document_: IAnnotationSchema;

  constructor(document) {
    this.document_ = document;
  }

  public static validateColor(color: string): boolean {
    return ['#e32990', '#fff110', '#4cba35', '#28a3dc', null].includes(color);
  }

  public getUserId(): string {
    return this.document_.userId;
  }

  public getLessonId(): string {
    return this.document_.lessonId;
  }

  public getId(): string {
    return this.document_._id;
  }

  public async setColor(color: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Annotation',
      this.document_.id,
      {
        $set: {
          color: color,
          editedAt: new Date()
        }
      }
    );
  }

  public async setText(text: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Annotation',
      this.document_.id,
      {
        $set: {
          text: text,
          editedAt: new Date()
        }
      }
    );
  }

  public async setShare(share: boolean): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Annotation',
      this.document_.id,
      {
        $set: {
          share: share,
          editedAt: new Date()
        }
      }
    );
  }

  public async setPublicForShare(publicForShare: boolean): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Annotation',
      this.document_.id,
      {
        $set: {
          publicForShare: publicForShare,
          editedAt: new Date()
        }
      }
    );
  }

  public toObject() {
    return {
      id: this.document_._id,
      lessonId: this.document_.lessonId,
      color: this.document_.color,
      text: this.document_.text,
      start: this.document_.start,
      end: this.document_.end,
      share: this.document_.share,
      editedAt: this.document_.editedAt,
      publicForShare: this.document_.publicForShare
    };
  }

  public static async find(
    userId: string,
    lessonId: string
  ): Promise<IAnnotation[]> {
    return (await Mongoose.find('Annotation', { userId, lessonId })).map(
      document => new AnnotationModel(document)
    );
  }

  public static async findById(annotationId: string): Promise<AnnotationModel> {
    const document = await Mongoose.findById('Annotation', annotationId);
    return document ? new AnnotationModel(document) : null;
  }

  public static async findByLessonId(lessonId: string): Promise<any> {
    const document = await Mongoose.find('Annotation', { lessonId: lessonId });
    return document;
  }

  public static async remove(filter: object): Promise<void> {
    await Mongoose.remove('Annotation', filter);
  }

  public static async create(
    userId: string,
    lessonId: string,
    color: string,
    text: string,
    start: number,
    end: number
  ): Promise<AnnotationModel> {
    const id = uuid.v4();
    await Mongoose.create('Annotation', <IAnnotationSchema>{
      _id: id,
      userId: userId,
      lessonId: lessonId,
      color: color,
      text: text,
      start: start,
      end: end,
      share: false,
      editedAt: new Date(),
      publicForShare: true
    });
    return await AnnotationModel.findById(id);
  }

  public async remove(): Promise<void> {
    await Mongoose.findByIdAndRemove('Annotation', this.document_._id);
  }

  public static async findByIdAndRemove(annotationId: string): Promise<void> {
    await Mongoose.findByIdAndRemove('Annotation', annotationId);
  }
}
