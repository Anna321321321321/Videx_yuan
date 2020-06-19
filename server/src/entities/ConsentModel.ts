import { IConsentSchema, Mongoose } from 'videx/server/mongodb';
import IConsent from './IConsent';
import * as uuid from 'uuid';

export default class ConsentModel implements IConsent {
  private document_: IConsentSchema;
  private userName_: string = null;
  private userId_: string = null;
  private userEmail_: string = null;
  private consentDate_: Date = null;

  constructor(document) {
    this.document_ = document;
  }

  public setUserName(name: string) {
    this.userName_ = name;
  }

  public async setNameEmailId(name: string, email: string, userid: string) {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Consent',
      this.document_.id,
      {
        $set: {
          userName: name,
          userEmail: email,
          userId: userid,
          consentDate: new Date()
        }
      }
    );
  }

  public setUserEmail(email: string) {
    this.userEmail_ = email;
  }

  public setUserId(id: string) {
    this.userId_ = id;
  }

  public setConsentDate(date: Date) {
    this.consentDate_ = date;
  }

  public getUserName(): string {
    return this.userName_;
  }

  public getUserEmail(): string {
    return this.userEmail_;
  }

  public getUserId(): string {
    return this.userId_;
  }

  public getConsentDate(): Date {
    return this.consentDate_;
  }

  public toObject(): {
    id: string;
    userName: string;
    userId: string;
    userEmail: string;
    consentDate: Date;
  } {
    return {
      id: this.document_.id,
      userName: this.document_.userName,
      userId: this.document_.userId,
      userEmail: this.document_.userEmail,
      consentDate: this.document_.consentDate
    };
  }

  public getId(): string {
    return this.document_._id;
  }

  public static async findById(id: string): Promise<IConsent> {
    const document: any = await Mongoose.findById('Consent', id);
    return document ? new ConsentModel(document) : null;
  }

  public static async findByUserId(userId: string): Promise<any> {
    const document = await Mongoose.find('Consent', { userId: userId });
    return document;
  }

  public static async findByUserEmail(userEmail: string): Promise<any> {
    const document = await Mongoose.find('Consent', { userEmail: userEmail });
    return document.length === 0 ? null : document;
  }

  public static async create(
    userId: string,
    userEmail: string,
    userName: string
  ): Promise<IConsent> {
    const id = uuid.v4();
    await Mongoose.create('Consent', {
      _id: id,
      userName: userName,
      userId: userId,
      userEmail: userEmail,
      consentDate: new Date()
    });

    return await ConsentModel.findById(id);
  }
}
