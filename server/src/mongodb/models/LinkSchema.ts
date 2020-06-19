import * as mongoose from 'mongoose';

interface ILink {
  _id: string;
  start: number;
  end: number;
  lessonId: string;
  courseId: string;
  token: string;
}

// @ts-ignore
export interface ILinkSchema extends ILink, mongoose.Document {}

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  start: {
    type: Number
  },
  end: {
    type: Number
  },
  lessonId: {
    type: String,
    ref: 'Lesson',
    required: true
  },
  courseId: {
    type: String,
    ref: 'Course',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
});

export default schema;
