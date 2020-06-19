import * as azure from 'azure';
import * as config from 'config';
import log from 'videx/server/log';
import IBlobStorage from './IBlobStorage';

export default class AzureBlobStorage implements IBlobStorage {
  private blobStorageService_ = azure.createBlobService(
    config.get<string>('AZURE.STORAGE.ACCOUNT'),
    config.get<string>('AZURE.STORAGE.ACCESS_KEY')
  );

  public deleteBlobIfExists(container, blob): Promise<void> {
    return new Promise((resolve, reject) => {
      log.trace('verbose', 'AzureBlobStorage request deleteBlobIfExists', {
        container,
        blob
      });
      this.blobStorageService_.deleteBlobIfExists(
        container,
        blob,
        (error, result, response) => {
          if (error) {
            log.trace('error', 'AzureBlobStorage deleteBlobIfExists error', {
              container,
              blob,
              error: JSON.stringify(error)
            });
            return reject(
              new Error('AzureBlobStorage deleteBlobIfExists error')
            );
          }
          log.trace('verbose', 'AzureBlobStorage deleteBlobIfExists complete', {
            container,
            blob
          });
          return resolve();
        }
      );
    });
  }

  public deleteContainerIfExists(container): Promise<void> {
    return new Promise((resolve, reject) => {
      log.trace('verbose', 'AzureBlobStorage request deleteContainerIfExists', {
        container
      });
      this.blobStorageService_.deleteContainerIfExists(
        container,
        (error, result, response) => {
          if (error) {
            log.trace(
              'error',
              'AzureBlobStorage deleteContainerIfExists error',
              {
                container,
                error: JSON.stringify(error)
              }
            );
            return reject(
              new Error('AzureBlobStorage deleteContainerIfExists error')
            );
          }
          log.trace(
            'verbose',
            'AzureBlobStorage deleteContainerIfExists complete',
            {
              container
            }
          );
          return resolve();
        }
      );
    });
  }

  public getBlobToLocalFile(container, blob, localFileName): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      log.trace('verbose', 'AzureBlobStorage request getBlobToLocalFile', {
        container,
        blob
      });
      this.blobStorageService_.getBlobToLocalFile(
        container,
        blob,
        localFileName,
        (error, result, response) => {
          if (error) {
            log.trace('error', 'AzureBlobStorage getBlobToLocalFile error', {
              container,
              blob,
              localFileName,
              error: JSON.stringify(error)
            });
            return reject(
              new Error('AzureBlobStorage getBlobToLocalFile error')
            );
          }
          log.trace('verbose', 'AzureBlobStorage getBlobToLocalFile complete', {
            container,
            blob
          });
          return resolve();
        }
      );
    });
  }

  public getBlobProperties(container, blob): Promise<any> {
    return new Promise((resolve, reject) => {
      log.trace('verbose', 'AzureBlobStorage request getBlobProperties', {
        container,
        blob
      });
      this.blobStorageService_.getBlobProperties(
        container,
        blob,
        (error, result, response) => {
          if (error) {
            log.trace('error', 'AzureBlobStorage getBlobProperties error', {
              container,
              blob,
              error: JSON.stringify(error)
            });
            return reject(
              new Error('AzureBlobStorage getBlobProperties error')
            );
          }
          log.trace('verbose', 'AzureBlobStorage getBlobProperties complete', {
            container,
            blob
          });
          return resolve(result);
        }
      );
    });
  }

  public listBlobsSegmented(container): Promise<ReadonlyArray<any>> {
    return new Promise<ReadonlyArray<any>>((resolve, reject) => {
      let aggregatedResult = [];
      const aggregateBlobs = (error, result, response, cb: Function) => {
        if (error) {
          cb(true, null);
        } else {
          aggregatedResult = aggregatedResult.concat(result.entries);
          if (result.continuationToken !== null) {
            this.blobStorageService_.listBlobsSegmented(
              container,
              result.concontinuationToken,
              (error, result, response) => {
                aggregateBlobs(error, result, response, cb);
              }
            );
          } else {
            cb(null, aggregatedResult);
          }
        }
      };

      log.trace('verbose', 'AzureBlobStorage request listBlobsSegmented', {
        container
      });
      this.blobStorageService_.listBlobsSegmented(
        container,
        null,
        (error, result, response) => {
          aggregateBlobs(error, result, response, (error, blobs) => {
            if (error) {
              log.trace('error', 'AzureBlobStorage listBlobsSegmented error', {
                container,
                error: JSON.stringify(error)
              });
              return reject(
                new Error('AzureBlobStorage listBlobsSegmented error')
              );
            } else {
              log.trace(
                'verbose',
                'AzureBlobStorage listBlobsSegmented complete',
                {
                  container
                }
              );
              resolve(blobs);
            }
          });
        }
      );
    });
  }

  // TODO: HANDLE TOKENS
  public listContainersSegmented(): Promise<string> {
    return new Promise((resolve, reject) => {
      log.trace('verbose', 'AzureBlobStorage request listContainersSegmented');
      this.blobStorageService_.listContainersSegmented(
        null,
        (error, result, response) => {
          if (error) {
            log.trace(
              'error',
              'AzureBlobStorage listContainersSegmented error',
              {
                error: JSON.stringify(error)
              }
            );
            return reject(
              new Error('AzureBlobStorage listContainersSegmented error')
            );
          }
          log.trace(
            'verbose',
            'AzureBlobStorage listContainersSegmented complete'
          );
          return resolve(result.entries);
        }
      );
    });
  }

  public createBlockBlobFromLocalFile(
    container,
    blob,
    localFileName
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      log.trace(
        'verbose',
        'AzureBlobStorage request createBlockBlobFromLocalFile',
        {
          container,
          blob
        }
      );
      this.blobStorageService_.createBlockBlobFromLocalFile(
        container,
        blob,
        localFileName,
        (error, result, response) => {
          if (error) {
            log.trace(
              'error',
              'AzureBlobStorage createBlockBlobFromLocalFile error',
              {
                container,
                blob,
                localFileName,
                error: JSON.stringify(error)
              }
            );
            return reject(
              new Error('AzureBlobStorage createBlockBlobFromLocalFile error')
            );
          }
          log.trace(
            'verbose',
            'AzureBlobStorage createBlockBlobFromLocalFile complete',
            {
              container,
              blob
            }
          );
          return resolve();
        }
      );
    });
  }

  public async search(container: string, regex: RegExp): Promise<string> {
    log.trace('verbose', 'AzureBlobStorage request search', {
      container,
      regex: JSON.stringify(regex)
    });
    const result: string[] = [];
    const blobs = await this.listBlobsSegmented(container);
    for (const blob of blobs) {
      if (regex.test(blob.name)) {
        result.push(blob.name);
      }
    }
    if (result.length !== 1) {
      log.trace('error', 'AzureBlobStorage search error', {
        result: JSON.stringify(result)
      });
      throw new Error(`AzureBlobStorage search error`);
    }
    log.trace('verbose', 'AzureBlobStorage search complete', {
      container,
      regex: JSON.stringify(regex)
    });
    return result[0];
  }
}
