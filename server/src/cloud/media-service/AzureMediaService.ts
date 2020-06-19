import * as config from 'config';
import * as https from 'https';
import { Client } from 'node-rest-client';
import log from 'videx/server/log';
import * as xml2js from 'xml2js';
import IMediaService from './IMediaService';

interface ITask {
  id: string;
  name: string;
}

interface IAsset {
  id: string;
  location: string;
  containerId: string;
}

enum JobType {
  Index = 0,
  Encoding = 1,
  Thumbnail = 2,
  Offline = 3,
  Total = 4
}

interface ILocator {
  baseUri: string;
  contentAccessComponent: string;
  path: string;
}

enum LocatorType {
  SAS = 1,
  OnDemandOrigin
}

export default class AzureMediaService implements IMediaService {
  private token: string;

  constructor(token) {
    this.token = token;
  }

  public static async create(): Promise<AzureMediaService> {
    const token = await AzureMediaService.getAccessToken_();
    return new AzureMediaService(token);
  }

  // Get an access token, prerequisite to using AMS API
  // https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started
  private static getAccessToken_(): Promise<string> {
    const args = {
      headers: {
        Accept: 'application/json',
        Connection: 'Keep-Alive',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        grant_type: 'client_credentials',
        client_id: config.get<string>('AZURE.MEDIA_SERVICE.CLIENT_ID'),
        client_secret: config.get<string>('AZURE.MEDIA_SERVICE.SECRET'),
        resource: 'https://rest.media.azure.net'
      }
    };

    return new Promise<string>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request getAccessToken_');
      new Client().post(
        `https://login.microsoftonline.com/${config.get<string>(
          'AZURE.MEDIA_SERVICE.AAD_TENANT_DOMAIN'
        )}/oauth2/token`,
        args,
        (data, response) => {
          if (response.statusCode !== 200) {
            log.trace('error', 'AzureMediaService getAccessToken_ error', {
              statusMessage: response.statusMessage
            });
            return reject(new Error('AzureMediaService getAccessToken_ error'));
          } else {
            log.trace('verbose', 'AzureMediaService getAccessToken_ complete');
            return resolve(data.access_token);
          }
        }
      );
    });
  }

  public createInputAsset(fileName: string): Promise<IAsset> {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') + 'Assets';
    const args = {
      headers: this.createHeader_(),
      data: {
        Name: fileName
      }
    };

    return new Promise<IAsset>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request createInputAsset');
      new Client().post(url, args, (data, response) => {
        if (response.statusCode !== 201) {
          log.trace('error', 'AzureMediaService createInputAsset error', {
            fileName,
            statusMessage: response.statusMessage
          });
          return reject(new Error('AzureMediaService createInputAsset error'));
        } else {
          const json = JSON.parse(data.toString('utf8'));
          const asset: IAsset = {
            id: json.Id,
            location: response.headers.location,
            containerId: json.Uri.split('/').pop()
          };
          log.trace('verbose', 'AzureMediaService createInputAsset complete', {
            assetId: asset.id
          });
          return resolve(asset);
        }
      });
    });
  }

  public createInputAssetFile(
    fileName: string,
    mimeType: string,
    assetId: string
  ): Promise<string> {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') + 'Files';
    const args = {
      headers: this.createHeader_(),
      data: {
        IsEncrypted: 'false',
        IsPrimary: 'false',
        MimeType: mimeType,
        Name: fileName,
        ParentAssetId: assetId
      }
    };

    return new Promise<string>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request createInputAssetFile', {
        assetId
      });

      new Client().post(url, args, (data, response) => {
        if (response.statusCode !== 201) {
          log.trace('error', 'AzureMediaService createInputAssetFile error', {
            fileName,
            statusMessage: response.statusMessage
          });
          return reject(
            new Error('AzureMediaService createInputAssetFile error')
          );
        } else {
          const json = JSON.parse(data.toString('utf8'));
          log.trace(
            'verbose',
            'AzureMediaService createInputAssetFile complete',
            {
              assetId,
              assetFileId: json.Id
            }
          );
          return resolve(json.Id);
        }
      });
    });
  }

  public updateInputAssetFile(
    fileName: string,
    assetId: string,
    assetFileId: string,
    fileSize: number
  ): Promise<void> {
    const host: string = config
      .get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT')
      .replace('https://', '')
      .replace('/api/', '');
    const path: string =
      "/api/Files('" + encodeURIComponent(assetFileId) + "')";

    const headers = this.createHeader_();
    const body = {
      ContentFileSize: fileSize.toString(),
      Id: assetFileId,
      // 'MimeType': 'video/mp4', // TODO: Autodetermine or remove?
      Name: fileName,
      ParentAssetId: assetId
    };
    const bodyJson = JSON.stringify(body);
    headers['Content-Length'] = Buffer.byteLength(bodyJson, 'utf8');

    const httpOptions = {
      headers,
      host,
      path,
      method: 'MERGE'
    };

    return new Promise<void>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request updateInputAssetFile', {
        assetId,
        assetFileId
      });
      const request = https.request(httpOptions, response => {
        if (response.statusCode !== 204) {
          log.trace('error', 'AzureMediaService updateInputAssetFile error', {
            fileName,
            assetId,
            assetFileId,
            statusMessage: response.statusMessage
          });
          return reject(
            new Error('AzureMediaService updateInputAssetFile error')
          );
        } else {
          log.trace(
            'verbose',
            'AzureMediaService updateInputAssetFile complete',
            {
              assetId,
              assetFileId
            }
          );
          return resolve();
        }
      });
      request.write(bodyJson);
      request.end();
      request.on('error', e => {
        reject(`error to update asset file because ${e}`);
      });
    });
  }

  public getMediaProcessor(processorName: string): Promise<string> {
    const encodedProcessorName: string = encodeURIComponent(processorName);
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
      "MediaProcessors()?$filter=Name%20eq%20'" +
      encodedProcessorName +
      "'";
    const args = {
      headers: this.createHeader_()
    };

    return new Promise<string>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request getMediaProcessor_', {
        processorName
      });
      new Client().get(url, args, (data, response) => {
        if (response.statusCode !== 200) {
          log.trace('error', 'AzureMediaService getMediaProcessor_ error', {
            processorName,
            statusMessage: response.statusMessage
          });
          return reject(
            new Error('AzureMediaService getMediaProcessor_ error')
          );
        } else {
          const json = JSON.parse(data.toString('utf8'));
          const processorId: string = json.value[0].Id;
          log.trace(
            'verbose',
            'AzureMediaService getMediaProcessor_ complete',
            {
              processorName,
              processorId
            }
          );
          return resolve(processorId);
        }
      });
    });
  }

  // This will create all the media service jobs.
  // https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started
  public createJob(
    lessonId: string,
    inputAssetLocation: string,
    indexMediaProcessorId: string,
    standardMediaProcessorId: string,
    notificationEndPointId: string
  ): Promise<string> {
    if (
      !lessonId ||
      !inputAssetLocation ||
      !indexMediaProcessorId ||
      !standardMediaProcessorId ||
      !notificationEndPointId
    ) {
      throw new Error('Internal Error');
    }
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') + 'Jobs';
    // The magic...
    // https://social.msdn.microsoft.com/Forums/sqlserver/en-US/cc69a85f-74b0-4d52-8e69-629ff5007169/create-an-encoding-job-with-jobnotificationsubscriptions-by-using-rest-api-got-a-response-with-400?forum=MediaServices
    // https://stackoverflow.com/questions/45443520/azure-media-services-how-to-set-up-job-notifications
    // https://docs.microsoft.com/en-us/rest/api/media/operations/jobnotificationsubscription
    const args = {
      headers: this.createHeader_(),
      data: {
        Name: lessonId,
        'InputMediaAssets@odata.bind': [inputAssetLocation],
        JobNotificationSubscriptions: [
          {
            TargetJobState: 2,
            NotificationEndPointId: notificationEndPointId
          }
        ],
        Tasks: [
          {
            Configuration: this.getJobConfiguration_(JobType.Index),
            MediaProcessorId: indexMediaProcessorId,
            TaskBody: `<?xml version="1.0" encoding="utf-8"?>
            <taskBody>
            <inputAsset>JobInputAsset(0)</inputAsset>
            <outputAsset>JobOutputAsset(${JobType.Index})</outputAsset>
            </taskBody>`
          },
          {
            Configuration: this.getJobConfiguration_(JobType.Encoding),
            MediaProcessorId: standardMediaProcessorId,
            TaskBody: `<?xml version="1.0" encoding="utf-8"?>
            <taskBody>
            <inputAsset>JobInputAsset(0)</inputAsset>
            <outputAsset>JobOutputAsset(${JobType.Encoding})</outputAsset>
            </taskBody>`
          },
          {
            Configuration: this.getJobConfiguration_(JobType.Thumbnail),
            MediaProcessorId: standardMediaProcessorId,
            TaskBody: `<?xml version="1.0" encoding="utf-8"?>
            <taskBody>
            <inputAsset>JobInputAsset(0)</inputAsset>
            <outputAsset>JobOutputAsset(${JobType.Thumbnail})</outputAsset>
            </taskBody>`
          },
          {
            Configuration: this.getJobConfiguration_(JobType.Offline),
            MediaProcessorId: standardMediaProcessorId,
            TaskBody: `<?xml version="1.0" encoding="utf-8"?>
            <taskBody>
            <inputAsset>JobInputAsset(0)</inputAsset>
            <outputAsset>JobOutputAsset(${JobType.Offline})</outputAsset>
            </taskBody>`
          }
        ]
      }
    };

    return new Promise<string>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request createJob', {
        lessonId,
        inputAssetLocation
      });
      new Client().post(url, args, (data, response) => {
        if (response.statusCode !== 201) {
          log.trace('error', 'AzureMediaService createJob error', {
            lessonId,
            inputAssetLocation,
            indexMediaProcessorId,
            standardMediaProcessorId,
            notificationEndPointId,
            statusMessage: response.statusMessage
          });
          return reject(new Error('AzureMediaService createJob error'));
        } else {
          const json = JSON.parse(data.toString('utf8'));
          log.trace('verbose', 'AzureMediaService createJob complete', {
            lessonId,
            inputAssetLocation
          });
          return resolve(json.Id);
        }
      });
    });
  }

  // Delete an asset which already exists in AMS
  // https://docs.microsoft.com/en-us/azure/media-services/media-services-dotnet-manage-entities
  public deleteAsset(assetId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const encodedAssetId: string = encodeURI(assetId);
      const url: string =
        config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
        "Assets('" +
        encodedAssetId +
        "')";
      const args = {
        headers: this.createHeader_()
      };
      log.trace('verbose', 'AzureMediaService request deleteAsset', {
        assetId
      });
      new Client().delete(url, args, (data, response) => {
        if (response.statusCode !== 204) {
          log.trace('error', 'AzureMediaService deleteAsset error', {
            assetId,
            statusMessage: response.statusMessage
          });
          return reject(new Error('AzureMediaService deleteAsset error'));
        } else {
          log.trace('verbose', 'AzureMediaService deleteAsset complete', {
            assetId
          });
          return resolve();
        }
      });
    });
  }

  // Get the output asset for a media processing job
  // https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started
  public getJobOutputs<ITask>(jobId: string): Promise<ReadonlyArray<ITask>> {
    const jobIdEncoded: string = encodeURI(jobId);
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
      "Jobs('" +
      jobIdEncoded +
      "')/OutputMediaAssets()";
    const args = {
      headers: this.createHeader_()
    };

    return new Promise<ReadonlyArray<ITask>>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request getJobOutputs', {
        jobId
      });
      new Client().get(url, args, (data, response) => {
        if (response.statusCode !== 200) {
          log.trace('error', 'AzureMediaService getJobOutputs error', {
            jobId,
            statusMessage: response.statusMessage
          });
          return reject(new Error('AzureMediaService getJobOutputs error'));
        } else {
          const parsedData = JSON.parse(data.toString('utf8'));
          log.trace('verbose', 'AzureMediaService getJobOutputs complete', {
            jobId
          });
          return resolve(
            parsedData.value.map(data => ({ id: data.Id, name: data.Name }))
          );
        }
      });
    });
  }

  public async createDownloadUrl(assetId, fileName): Promise<string> {
    log.trace('verbose', 'AzureMediaService request createDownloadUrl', {
      assetId,
      fileName
    });
    const accessPolicyId: string = await this.createAccessPolicy_();
    const locator = await this.createLocator_(
      LocatorType.SAS,
      assetId,
      accessPolicyId
    );
    log.trace('verbose', 'AzureMediaService createDownloadUrl complete', {
      assetId,
      fileName
    });
    return locator.baseUri + '/' + fileName + locator.contentAccessComponent;
  }

  public async createStreamingUrl(assetId, fileName): Promise<string> {
    log.trace('verbose', 'AzureMediaService request createStreamingUrl', {
      assetId,
      fileName
    });
    const accessPolicyId: string = await this.createAccessPolicy_();
    const locator = await this.createLocator_(
      LocatorType.OnDemandOrigin,
      assetId,
      accessPolicyId
    );
    log.trace('verbose', 'AzureMediaService createStreamingUrl complete', {
      assetId,
      fileName
    });
    return locator.path + fileName;
  }

  // Create access policy to download/stream a media asset
  // https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started
  private createAccessPolicy_(): Promise<string> {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
      'AccessPolicies';
    const args = {
      headers: this.createHeader_(),
      data: {
        Name: 'DownloadPolicy',
        DurationInMinutes: (365 * 24 * 60 * 100).toString(),
        Permissions: 1 // Read
      }
    };

    return new Promise<string>((resolve, reject) => {
      log.trace('verbose', 'AzureMediaService request createAccessPolicy_');
      new Client().post(url, args, (data, response) => {
        if (response.statusCode !== 201) {
          log.trace('error', 'AzureMediaService createAccessPolicy_ error', {
            statusMessage: response.statusMessage
          });
          return reject(
            new Error('AzureMediaService createAccessPolicy_ error')
          );
        } else {
          const json = JSON.parse(data.toString('utf8'));
          log.trace(
            'verbose',
            'AzureMediaService createAccessPolicy_ complete'
          );
          resolve(json.Id);
        }
      });
    });
  }

  // Create locator (URL signature) to either download or stream a media asset
  // https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started
  private createLocator_(
    type: LocatorType,
    assetId: string,
    accessPolicyId: string
  ): Promise<ILocator> {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') + 'Locators';
    const args = {
      headers: this.createHeader_(),
      data: {
        AccessPolicyId: accessPolicyId,
        AssetId: assetId,
        StartTime: new Date(Date.now() - 5 * 60 * 1000)
          .toISOString()
          .split('.', 1)[0], // Start 5 minutes before to prevent clock skew
        Type: type
      }
    };

    return new Promise<ILocator>((resolve, reject) => {
      new Client().post(url, args, (data, response) => {
        log.trace('verbose', 'AzureMediaService request createLocator_', {
          assetId,
          accessPolicyId
        });
        if (response.statusCode !== 201) {
          log.trace('error', 'AzureMediaService createLocator_ error', {
            assetId,
            accessPolicyId,
            statusMessage: response.statusMessage
          });
          return reject(new Error('AzureMediaService createLocator_ error'));
        } else {
          const json = JSON.parse(data.toString('utf8'));
          const locator: ILocator = {
            baseUri: json.BaseUri,
            contentAccessComponent: json.ContentAccessComponent,
            path: json.Path
          };
          log.trace('verbose', 'AzureMediaService createLocator_ complete', {
            assetId,
            accessPolicyId
          });
          return resolve(locator);
        }
      });
    });
  }

  // See https://docs.microsoft.com/en-us/azure/media-services/media-services-mes-presets-overview
  // and https://docs.microsoft.com/en-us/azure/media-services/media-services-mes-schema
  private getJobConfiguration_(jobType: JobType): string {
    switch (jobType) {
      case JobType.Encoding:
        // Encode video at various bitrates for adaptive bitrate streaming (provides streaming manifest and download files)
        return 'Adaptive Streaming';
      case JobType.Index:
        return JSON.stringify({
          version: '1.0',
          Features: [
            {
              Options: {
                Formats: ['WebVtt'],
                Language: 'enUs',
                Type: 'RecoOptions'
              },
              Type: 'SpReco'
            }
          ]
        });
      case JobType.Thumbnail:
        return JSON.stringify({
          Version: 1.0,
          Codecs: [
            {
              JpgLayers: [
                {
                  Quality: 90,
                  Type: 'JpgLayer',
                  Width: 480,
                  Height: 360
                }
              ],
              Start: '0%',
              Step: '00:00:05',
              Range: '100%',
              Type: 'JpgImage'
            }
          ],
          Outputs: [
            {
              FileName: '{Index}{Extension}',
              Format: { Type: 'JpgFormat' }
            }
          ]
        });
      case JobType.Offline:
        return JSON.stringify({
          Version: 1.0,
          Codecs: [
            {
              KeyFrameInterval: '00:00:05',
              SceneChangeDetection: true,
              H264Layers: [
                {
                  Profile: 'Baseline',
                  Level: '3',
                  Bitrate: 500,
                  MaxBitrate: 500,
                  BufferWindow: '00:00:05',
                  Width: 480,
                  Height: 360,
                  ReferenceFrames: 3,
                  EntropyMode: 'Cavlc',
                  Type: 'H264Layer',
                  FrameRate: '0/1'
                }
              ],
              Type: 'H264Video'
            },
            {
              Profile: 'AACLC',
              Channels: 2,
              SamplingRate: 48000,
              Bitrate: 128,
              Type: 'AACAudio'
            }
          ],
          Outputs: [
            {
              FileName: '{Basename}.mp4',
              Format: {
                Type: 'MP4Format'
              }
            }
          ]
        });
    }
  }

  private createHeader_() {
    // See: https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started
    return {
      Authorization: 'Bearer ' + this.token,
      'x-ms-version': '2.17',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DataServiceVersion: '3.0;NetFx',
      MaxDataServiceVersion: '3.0;NetFx'
    };
  }

  public assetId2container(assetId: string) {
    try {
      const re1 = '.*?';
      const re2 =
        '([A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12})';
      const p = new RegExp(re1 + re2, 'i');
      const m = p.exec(assetId);
      return `asset-${m[1]}`;
    } catch (e) {
      log.trace('error', 'AzureMediaService assetId2container error', {
        assetId
      });
      throw new Error('AzureMediaService assetId2container error');
    }
  }
}
