export default interface IExperiment {
  assign(): string;
  payload(
    treatmentId: string
  ): { experimentId: string; treatementId: string; settings: object };
  toObject(): { id: string; name: string };
  getId(): string;
  remove(): Promise<void>;
}
