export default interface IBlobStorage {
  deleteBlobIfExists: (container: string, blob: string) => Promise<void>;
  deleteContainerIfExists: (container: string) => Promise<void>;
  getBlobToLocalFile: (
    container: string,
    blob: string,
    localFileName: string
  ) => Promise<void>;
  getBlobProperties: (container: string, blob: string) => Promise<any>;
  listBlobsSegmented: (container: string) => Promise<ReadonlyArray<any>>;
  listContainersSegmented: () => Promise<string>;
  createBlockBlobFromLocalFile: (
    container: string,
    blob: string,
    localFileName: string
  ) => Promise<void>;
  search: (container: string, regex: RegExp) => Promise<string>;
}
