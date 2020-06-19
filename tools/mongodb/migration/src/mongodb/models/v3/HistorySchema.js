import mongoose from 'mongoose';

export const historySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'UserV3',
    required: true
  },
  lessonId: {
    type: String,
    ref: 'LessonV3',
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

export default mongoose.model('HistoryV3', historySchema);
