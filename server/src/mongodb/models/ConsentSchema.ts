import * as mongoose from 'mongoose';

export type IConsentSchema = mongoose.Document & {
  _id: any;
  userId: string;
  userName: string;
  userEmail: string;
  consentDate: Date;
};

export default new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  userEmail: {
    type: String
  },
  consentDate: {
    type: Date,
    required: true
  }
});
