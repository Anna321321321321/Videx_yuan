export default interface IExport {
  build(
    annotations: {
      id: string;
      text: string;
      color: string;
      start: number;
      end: number;
    }[]
  ): Promise<void>;
  send(): Promise<any>;
  get(): any;
}
