export default interface IMediaManager {
  create: (
    name: string,
    file
  ) => Promise<{ inputAssetId: string; jobId: string }>;
  string2blob: (input: string, assetId: string, regex: RegExp) => Promise<void>;
  blob2string: (assetId: string, regex: RegExp) => Promise<string>;
  save2blob: (assetId: string, name: string, file: string) => Promise<void>;
  deleteAsset: (assetId: string) => Promise<void>;
  getJobOutputs: (
    jobId: string
  ) => Promise<{
    indexAssetId: string;
    encodingAssetId: string;
    thumbnailAssetId: string;
    offlineAssetId: string;
  }>;
  findCreateDownloadUrl: (
    assetId: string,
    fileRegExp: RegExp
  ) => Promise<string>;
  createDownloadUrl: (assetId: string, file: string) => Promise<string>;
  findCreateStreamingUrl: (
    assetId: string,
    fileRegExp: RegExp,
    postfix: string
  ) => Promise<string>;
}
