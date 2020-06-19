import * as mongoose from 'mongoose';

export type IAnnotationSchema = mongoose.Document & {
  _id: any;
  userId: string;
  lessonId: string;
  text: string;
  color: string;
  start: number;
  end: number;
  share: boolean;
  editedAt: Date;
};

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
  lessonId: {
    type: String,
    ref: 'Lesson',
    required: true
  },
  text: {
    type: String
  },
  color: {
    type: String
  },
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  },
  share: {
    type: Boolean,
    required: true,
    default: false
  },
  editedAt: {
    type: Date,
    required: true
  }
});
