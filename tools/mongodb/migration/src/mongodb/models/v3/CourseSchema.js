import mongoose from 'mongoose';

export const courseSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'UserV3',
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
      ref: 'UserV3'
    }
  ]
});

export default mongoose.model('CourseV3', courseSchema);
