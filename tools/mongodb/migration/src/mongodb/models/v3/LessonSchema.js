import mongoose from 'mongoose';

export const lessonSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  duration: {
    type: Number
  },
  azure: {
    assetsId: {
      inputAssetId: {
        type: String
      },
      encodingAssetId: {
        type: String
      },
      indexAssetId: {
        type: String
      },
      thumbnailAssetId: {
        type: String
      },
      offlineAssetId: {
        type: String
      }
    },
    jobId: {
      type: String
    }
  },
  video: {
    streaming: {
      type: String
    },
    download: {
      type: String
    }
  },
  transcript: {
    text: {
      type: String
    },
    file: {
      type: String
    }
  },
  thumbnail: {
    url: {
      type: String
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    sas: {
      type: String
    }
  },
  category: {
    type: String,
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
  keywords: [
    {
      type: String
    }
  ],
  views: [
    {
      _id: {
        type: Number,
        required: true
      },
      counter: {
        type: Number,
        required: true
      }
    }
  ]
});

export default mongoose.model('LessonV3', lessonSchema);
