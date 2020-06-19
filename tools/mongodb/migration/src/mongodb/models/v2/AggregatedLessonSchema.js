import mongoose from 'mongoose';

const aggregatedLessonSchema = new mongoose.Schema({
  _id: {
    type: String,
    ref: 'Lesson',
    required: true
  },
  highlights: {
    type: Array
  },
  notes: {
    type: Array
  },
  tags: {
    type: Array
  },
  views: [
    {
      _id: {
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

export default mongoose.model('AggregatedLesson', aggregatedLessonSchema);
