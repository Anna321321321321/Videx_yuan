import mongoose from 'mongoose';

export const annotationSchema = new mongoose.Schema({
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
    ref: 'LessonV3',
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
  },
  publicForShare: {
    type: Boolean,
    required: true,
    default: true,
  }
});

export default mongoose.model('AnnotationV3', annotationSchema);
