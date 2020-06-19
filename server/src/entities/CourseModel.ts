import { ICourseSchema, Mongoose } from 'videx/server/mongodb';
import { Crypto } from 'videx/server/utilities';
import ICourse from './ICourse';

export default class CourseModel implements ICourse {
  private document_: ICourseSchema = null;

  constructor(document) {
    this.document_ = document;
  }

  public getUserId(): string {
    return this.document_.userId;
  }

  public async setUserId(userId: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Course',
      this.document_.id,
      {
        $set: {
          userId: userId
        },
        $pull: {
          subscribers: userId
        }
      }
    );
  }

  public isOwner(userId: string): boolean {
    return this.document_.userId === userId;
  }

  public isSubscriber(userId: string): boolean {
    return this.document_.subscribers.includes(userId);
  }

  public getId(): string {
    return this.document_.id;
  }

  public async addSubscriber(userId: string): Promise<void> {
    this.document_ = await await Mongoose.findByIdAndUpdate(
      'Course',
      this.document_.id,
      {
        $addToSet: {
          subscribers: userId
        }
      }
    );
  }

  public async setReleaseDate(releaseDate: Date): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Course',
      this.document_.id,
      {
        $set: {
          releaseDate: releaseDate
        }
      }
    );
  }

  public async setName(name: string): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Course',
      this.document_.id,
      {
        $set: {
          name: name
        }
      }
    );
  }

  public getName(): string {
    return this.document_.name;
  }

  public getReleaseDate(): Date {
    return this.document_.releaseDate;
  }

  public async remove() {
    await Mongoose.findByIdAndRemove('Course', this.document_.id);
    this.document_ = null;
  }

  public getSubscribers(): Array<string> {
    return this.document_.subscribers;
  }

  public getToken(): string {
    return this.document_.token;
  }

  public toObject() {
    return {
      id: this.getId(),
      name: this.getName(),
      releaseDate: this.getReleaseDate()
    };
  }

  public static async findByToken(token: string): Promise<ICourse> {
    const document: any = await Mongoose.findOne('Course', { token });
    return document ? new CourseModel(document) : null;
  }

  public static async findById(id: string): Promise<ICourse> {
    const document: any = await Mongoose.findById('Course', id);
    return document ? new CourseModel(document) : null;
  }

  public static async find(filter: object): Promise<ICourse[]> {
    const documents: any = await Mongoose.find('Course', filter);
    return documents.map(document => new CourseModel(document));
  }

  public static async update(filter: object, command: object): Promise<void> {
    await Mongoose.update('Course', filter, command, { multi: true });
  }

  public static async create(
    id: string,
    userId: string,
    name: string,
    releaseDate: Date
  ): Promise<ICourse> {
    await Mongoose.create('Course', {
      _id: id,
      userId: userId,
      name: name,
      releaseDate: releaseDate,
      token: Crypto.randomId(8),
      subscribers: []
    });
    return await CourseModel.findById(id);
  }
}
