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

export interface GETLessonEdit {
  name: string;
  summary: string;
  transcript: string;
  releaseDate: Date;
}

export interface GETLesson {
  metadata: {
    courseId: string;
    lessonId: string;
    name: string;
  };
  transcript: {
    text: object;
    file: string;
  };
  video: {
    streaming: string;
    download: string;
  };
  sprite: {
    url: string;
    stylesheet: string;
  };
}
