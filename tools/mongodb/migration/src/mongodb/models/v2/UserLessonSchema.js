import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  range: {
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    }
  }
});

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  note: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const tagSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  range: {
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    }
  }
});

const viewSchema = new mongoose.Schema(
  {
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    },
    counter: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);

export const userLessonSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  highlights: [highlightSchema],
  notes: [noteSchema],
  tags: [tagSchema],
  views: [viewSchema]
});

export default mongoose.model('UserLesson', userLessonSchema);
