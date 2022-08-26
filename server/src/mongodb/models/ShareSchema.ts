import * as mongoose from 'mongoose';

interface IShare {
  _id: string;
  userId: string;
  lessonId: string;
  link: string;
  annoations: string[];
  accessedBy: string[];
}

// @ts-ignore
export interface IShareSchema extends IShare, mongoose.Document {}

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  lessonId: {
    type: String,
    ref: 'Lesson',
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  annoations: [
    {
      type: String,
      ref: 'Annotation',
    },
  ],
  accessedBy: [
    {
      type: String,
      ref: 'User',
    },
  ],
});

export default schema;
