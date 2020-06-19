import { LessonStatus } from 'videx/api';

export default interface ILessonManager {
  create: (
    name: string,
    courseId: string,
    summary: string,
    duration: number,
    transcript: string,
    file,
    releaseDate: Date,
    category: string
  ) => Promise<void>;
  transcriptSaveSync: (
    transcript: string,
    save: boolean,
    sync: boolean
  ) => Promise<void>;
  postProcess: (state: LessonStatus, jobId: string) => Promise<void>;
  del: () => Promise<void>;
}
