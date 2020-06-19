import * as mongoose from 'mongoose';

export const enum LessonStatus {
  Undefined = 0,
  Queued = 1,
  Scheduled = 2,
  Processing = 3,
  Finished = 4,
  Error = 5,
  Canceled = 6,
  Canceling = 7
}

interface ILesson {
  _id: any;
  name: string;
  courseId: string;
  summary: string;
  status: LessonStatus;
  duration: number;
  azure: {
    assetsId: {
      inputAssetId: string;
      encodingAssetId: string;
      indexAssetId: string;
      thumbnailAssetId: string;
      offlineAssetId: string;
    };
    jobId: string;
  };
  video: {
    streaming: string;
    download: string;
  };
  transcript: {
    text: string;
    file: string;
  };
  thumbnail: {
    url: string;
    height: number;
    width: number;
    sas: string;
  };
  category: string;
  releaseDate: Date;
  publish: boolean;
  keywords: string[];
  views: (mongoose.Document & {
    counter: number;
  })[];
}

export interface ILessonSchema extends ILesson, mongoose.Document {}

const schema = new mongoose.Schema({
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
    type: Number,
    required: true
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

schema.index({
  name: 'text',
  summary: 'text',
  'transcript.text': 'text'
});

export default schema;
