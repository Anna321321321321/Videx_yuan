import * as mongoose from 'mongoose';

export type IReactionSchema = mongoose.Document & {
  _id: any;
  annotationId: string;
  userId: string;
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
  annotationId: {
    type: String,
    ref: 'Annotation',
    required: true
  }
});
