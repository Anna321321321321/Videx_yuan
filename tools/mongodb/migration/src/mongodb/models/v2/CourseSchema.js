import mongoose from 'mongoose';

export const courseSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    ref: 'User',
    required: true
  },
  administrators: [
    {
      type: String,
      ref: 'User'
    }
  ],
  releaseDate: {
    type: Date,
    required: true
  },
  lessons: [
    {
      _id: {
        type: String,
        ref: 'Lesson',
        required: true
      },
      releaseDate: {
        type: Date,
        required: true
      },
      publish: {
        type: Boolean,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      keyWords: [
        {
          type: String
        }
      ]
    }
  ],
  link: {
    _id: false,
    secret: {
      type: String
    }
  }
});

export default mongoose.model('Course', courseSchema);
