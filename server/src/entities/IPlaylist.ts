export default interface IPlaylist {
  setLessons(
    lessons: {
      name: string;
      preview: string;
      _id: string;
      duration: string;
      releaseDate: Date;
    }[]
  ): void;
  toObject: () => {
    id: string;
    name: string;
    lessons: any[];
    courseId: string;
  };
  getId: () => string;
  getName: () => string;
}
