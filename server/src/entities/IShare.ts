export default interface IShare {
  toObject(): {
    id: string;
    userId: string;
    lessonId: string;
    link: string;
    annoations: string[];
    accessedBy: string[];
  };
  addAccessor1(link: string, accessorId: string): Promise<void>;
  addAccessor(accessorId: string): Promise<void>;
  getAccessor: () => Array<string>;
}
