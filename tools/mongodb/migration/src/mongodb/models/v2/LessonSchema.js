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
  owner: {
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
  azure: {
    assetsId: {
      inputAssetId: {
        type: String,
        required: true
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
      type: String,
      required: true
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
    preview: {
      type: String
    },
    sprite: {
      url: {
        type: String
      },
      stylesheet: {
        type: String
      }
    }
  }
});

export default mongoose.model('Lesson', lessonSchema);
