import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  school: {
    type: Number,
    required: true
  }
});

export default mongoose.model('UserV3', userSchema);
