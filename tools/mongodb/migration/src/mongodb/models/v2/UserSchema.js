import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  courses: [
    {
      type: String,
      ref: 'Course'
    }
  ],
  lessons: [
    {
      type: String,
      ref: 'Lesson'
    }
  ],
  type: {
    type: Number,
    required: true
  },
  school: {
    type: Number,
    required: true
  }
});

export default mongoose.model('User', userSchema);
