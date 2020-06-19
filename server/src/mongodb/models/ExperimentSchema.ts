import * as mongoose from 'mongoose';

export type IExperimentSchema = mongoose.Document & {
  _id: any;
  name: string;
  treatments: mongoose.Document &
    {
      _id: string;
      settings: {
        name: string;
        value: object;
      }[];
      percentage: number;
    }[];
};

export default new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  treatments: [
    {
      _id: {
        type: String,
        required: true
      },
      settings: [
        {
          _id: false,
          name: {
            type: String,
            required: true
          },
          value: {
            type: Object,
            required: true
          }
        }
      ],
      percentage: {
        type: Number,
        required: true
      }
    }
  ]
});
