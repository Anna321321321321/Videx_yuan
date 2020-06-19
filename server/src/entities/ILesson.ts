import { LessonStatus } from 'videx/server/mongodb';

export default interface ILesson {
  getId(): string;
  getCourseId(): string;
  setReleaseDate(date: Date): Promise<void>;
  getReleaseDate(): Date;
  setCategory(category: string): Promise<void>;
  getCategory(): string;
  setPublish(publish: boolean): Promise<void>;
  getPublish(): boolean;
  getStatus(): LessonStatus;
  getSummary(): string;
  getDuration(): number;
  getName(): string;
  getJobId(): string;
  getInputAssetId(): string;
  getEncodingAssetId(): string;
  getPreview(): string;
  getIndexAssetId(): string;
  getThumbnailAssetId(): string;
  getOfflineAssetId(): string;
  getTranscriptText(): string;
  setName(name: string): Promise<void>;
  setVideo(streaming: string, offline: string): Promise<void>;
  setTranscriptText(text: string): Promise<void>;
  setTranscriptFile(url: string): Promise<void>;
  setThumbnail(
    url: string,
    height: number,
    width: number,
    sas: string
  ): Promise<void>;
  setStatus(status: number): Promise<void>;
  setSummary(summary: string): Promise<void>;
  setJobId(id: string): Promise<void>;
  setInputAssetId(id: string): Promise<void>;
  setEncodingAssetId(id: string): Promise<void>;
  setIndexAssetId(id: string): Promise<void>;
  setThumbnailAssetId(id: string): Promise<void>;
  setOfflineAssetId(id: string): Promise<void>;
  del(): Promise<void>;
  toObject(): {
    id: string;
    name: string;
    summary: string;
    duration: number;
    releaseDate: Date;
    category: string;
    publish: boolean;
    transcript: {
      text: { start: number; end: number; text: string }[];
      file: string;
    };
    video: {
      streaming: string;
      download: string;
    };
    thumbnail: {
      url: string;
      height: number;
      width: number;
      sas: string;
    };
  };
  getViews(): { counter: number; start: number; end: number }[];
  setViews(views: number[]): Promise<void>;
}
