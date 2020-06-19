export default interface IMediaService {
  createInputAsset: (fileName: string) => Promise<any>;
  createInputAssetFile: (
    fileName: string,
    mimeType: string,
    assetId: string
  ) => Promise<string>;
  updateInputAssetFile: (
    fileName: string,
    assetId: string,
    assetFileId: string,
    fileSize: number
  ) => Promise<void>;
  createJob: (
    lessonId: string,
    inputAssetLocation: string,
    indexMediaProcessorId: string,
    standardMediaProcessorId: string,
    notificationEndPointId: string
  ) => Promise<string>;
  getMediaProcessor: (processorName: string) => Promise<string>;
  deleteAsset: (assetId: string) => Promise<void>;
  getJobOutputs: (jobId: string) => Promise<ReadonlyArray<any>>;
  createDownloadUrl: (assetId, fileName) => Promise<string>;
  createStreamingUrl: (assetId, fileName) => Promise<string>;
  assetId2container: (assetId: string) => string;
}
