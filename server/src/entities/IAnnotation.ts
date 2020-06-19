export default interface IAnnotation {
  getId(): string;
  getUserId(): string;
  getLessonId(): string;
  remove(): Promise<void>;
  setColor(color: string): Promise<void>;
  setText(text: string): Promise<void>;
  setShare(share: boolean): Promise<void>;
  toObject(): {
    id: string;
    color: string;
    text: string;
    start: number;
    end: number;
    share: boolean;
    editedAt: Date;
  };
}
