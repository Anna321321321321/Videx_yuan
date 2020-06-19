import * as mongoose from 'mongoose';

interface ICourse {
  _id: any;
  userId: string;
  name: string;
  releaseDate: Date;
  token: string;
  subscribers: string[];
}

export interface ICourseSchema extends ICourse, mongoose.Document {}

export default new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  subscribers: [
    {
      type: String,
      ref: 'User'
    }
  ]
});
