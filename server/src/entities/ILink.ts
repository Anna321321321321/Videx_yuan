export default interface ILink {
  getToken: () => string;
  getLink: () => string;
  toObject(): {
    start: number;
    end: number;
    lessonId: string;
    courseId: string;
  };
}
