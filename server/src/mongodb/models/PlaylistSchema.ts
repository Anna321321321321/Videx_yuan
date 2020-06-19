import * as mongoose from 'mongoose';

export type IPlaylistSchema = mongoose.Document & {
  _id: string;
  lessons: {
    name: string;
    preview: string;
    _id: string;
    duration: string;
    releaseDate: Date;
  }[];
  courseId: string;
  name: string;
};

export default new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  lessons: [
    {
      name: {
        type: String,
        required: true
      },
      _id: {
        type: String,
        required: true
      },
      duration: {
        type: String
      },
      preview: {
        type: String,
        required: true
      },
      releaseDate: {
        type: Date,
        required: true
      }
    }
  ],
  courseId: {
    type: String,
    ref: 'Course',
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
