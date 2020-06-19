import * as mongoose from 'mongoose';

export enum UserType {
  Student,
  Teacher,
  GlobalAdministrator
}

export enum SchoolList {
  UniversityOfBritishColumbia = 0
}

export type IUserSchema = mongoose.Document & {
  _id: any;
  type: UserType;
  school: SchoolList;
};

export default new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  school: {
    type: Number,
    required: true
  }
});
