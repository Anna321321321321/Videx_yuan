import {
  IUserSchema,
  Mongoose,
  SchoolList,
  UserType
} from 'videx/server/mongodb';
import IUser from './IUser';

export default class UserModel implements IUser {
  private document_: IUserSchema = null;
  private name_: string = null;
  private token_: string = null;
  private userPrincipalName_: string = null;

  constructor(document) {
    this.document_ = document;
  }

  public setName(name: string) {
    this.name_ = name;
  }

  public isStudent(): boolean {
    return this.document_.type === 0;
  }

  public isTeacher(): boolean {
    return this.document_.type === 1;
  }

  public isGlobalAdministrator(): boolean {
    return this.document_.type === 2;
  }

  public setToken(token: string) {
    this.token_ = token;
  }

  public setUserPrincipalName(userPrincipalName: string): void {
    this.userPrincipalName_ = userPrincipalName;
  }

  public getUserPrincipalName(): string {
    return this.userPrincipalName_;
  }

  public getToken(): string {
    return this.token_;
  }

  public toObject(): {
    id: string;
    name: string;
    type: number;
    email: string;
  } {
    return {
      id: this.document_.id,
      name: this.name_,
      type: this.document_.type,
      email: this.userPrincipalName_
    };
  }

  public async setType(type: number): Promise<void> {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'User',
      this.document_._id,
      {
        $set: {
          type: type
        }
      }
    );
    return this.document_._id;
  }

  public getId(): string {
    return this.document_._id;
  }

  public static async remove(filter: object): Promise<void> {
    await Mongoose.remove('User', filter);
  }

  public static async findById(id: string): Promise<IUser> {
    const document: any = await Mongoose.findById('User', id);
    return document ? new UserModel(document) : null;
  }

  public static async create(id: string) {
    await Mongoose.create('User', <IUserSchema>{
      _id: id,
      school: SchoolList.UniversityOfBritishColumbia,
      type: UserType.Student
    });
  }
}
