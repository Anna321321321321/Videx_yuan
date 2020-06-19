import * as mongoose from 'mongoose';

export type IFlightSchema = mongoose.Document & {
  _id: any;
  userId: string;
  experimentId: string;
  treatmentId: string;
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
  experimentId: {
    type: String,
    ref: 'Experiment',
    required: true
  },
  treatmentId: {
    type: String,
    required: true
  }
});
