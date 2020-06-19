export default interface IHistory {
  getId(): string;
  getCounter(): number;
  getDate(): Date;
  getPlayhead(): number;
  setPlayhead(timestamp: number): Promise<void>;
  setAccess(): Promise<void>;
  getViews(): { start: number; end: number; counter: number }[];
  setViews(
    heatmap: { start: number; end: number; counter: number }[]
  ): Promise<void>;
}
