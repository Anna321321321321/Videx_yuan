import * as mongoose from 'mongoose';

export type IHistorySchema = mongoose.Document & {
  _id: string;
  userId: string;
  lessonId: string;
  counter: number;
  date: Date;
  playhead: number;
  views: (mongoose.Document & {
    start: number;
    end: number;
    counter: number;
  })[];
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
  counter: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  },
  playhead: {
    type: Number
  },
  views: [
    {
      _id: false,
      start: {
        type: Number,
        required: true
      },
      end: {
        type: Number,
        required: true
      },
      counter: {
        type: Number,
        required: true
      }
    }
  ]
});
