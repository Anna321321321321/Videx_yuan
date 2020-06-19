import * as config from 'config';
import { Client } from 'node-rest-client';
import log from 'videx/server/log';
import * as xml2js from 'xml2js';
import INotificationEndpoint from './INotificationEndpoint';

interface INotificationEndPoint {
  readonly id: string;
  readonly name: string;
}

enum NotificationEndPointType {
  AzureQueue = 1,
  WebHook = 3
}

export default class AzureNotificationEndpoint
  implements INotificationEndpoint {
  private token: string = null;

  constructor(token) {
    this.token = token;
  }

  public static async create(): Promise<AzureNotificationEndpoint> {
    const token = await AzureNotificationEndpoint.getAccessToken_();
    return new AzureNotificationEndpoint(token);
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
      log.trace('verbose', 'AzureNotificationEndpoint request getAccessToken_');
      new Client().post(
        `https://login.microsoftonline.com/${config.get<string>(
          'AZURE.MEDIA_SERVICE.AAD_TENANT_DOMAIN'
        )}/oauth2/token`,
        args,
        (data, response) => {
          if (response.statusCode !== 200) {
            log.trace(
              'error',
              'AzureNotificationEndpoint getAccessToken_ error',
              {
                statusMessage: response.statusMessage
              }
            );
            return reject(
              new Error('AzureNotificationEndpoint getAccessToken_ error')
            );
          } else {
            log.trace(
              'verbose',
              'AzureNotificationEndpoint getAccessToken_ complete'
            );
            return resolve(data.access_token);
          }
        }
      );
    });
  }

  public createWebHookNotificationEndPoint<INotificationEndPoint>(
    notificationEndPointName: string
  ): Promise<INotificationEndPoint> {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
      'NotificationEndPoints';
    const args = {
      headers: this.createHeader_(),
      data: `<?xml version="1.0" encoding="utf-8"?>
      <entry xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">
        <content type="application/xml">
          <m:properties>
            <d:EndPointAddress>${config.get<string>(
              'AZURE.MEDIA_SERVICE.WEBHOOK_NOTIFICATION_POINT'
            )}</d:EndPointAddress>
            <d:EndPointType m:type="Edm.Int32">${
              NotificationEndPointType.WebHook
            }</d:EndPointType>
            <d:Id m:null="true"/>
            <d:Name>${notificationEndPointName}</d:Name>
          </m:properties>
        </content>
      </entry>`
    };

    return new Promise<INotificationEndPoint>((resolve, reject) => {
      log.trace(
        'verbose',
        'AzureNotificationEndpoint request createWebHookNotificationEndPoint'
      );
      new Client().post(url, args, async (data, response) => {
        if (response.statusCode !== 201) {
          log.trace(
            'error',
            'AzureNotificationEndpoint createWebHookNotificationEndPoint error',
            {
              statusMessage: response.statusMessage
            }
          );
          return reject(
            new Error(
              'AzureNotificationEndpoint createWebHookNotificationEndPoint error'
            )
          );
        } else {
          log.trace(
            'verbose',
            'AzureNotificationEndpoint createWebHookNotificationEndPoint complete'
          );
          const parsedData = (await this.xmlParseString_(data))['entry'][
            'content'
          ][0]['m:properties'][0];
          return resolve({
            // @ts-ignore
            id: parsedData['d:Id'][0],
            name: parsedData['d:Name'][0]
          });
        }
      });
    });
  }

  public createQueueNotificationEndPoint(
    notificationEndPointName: string,
    queueName: string
  ): Promise<INotificationEndPoint> {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
      'NotificationEndPoints';
    const args = {
      headers: this.createHeader_(),
      data: `<?xml version="1.0" encoding="utf-8"?>
      <entry xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">
        <content type="application/xml">
          <m:properties>
            <d:EndPointAddress>${queueName}</d:EndPointAddress>
            <d:EndPointType m:type="Edm.Int32">${
              NotificationEndPointType.AzureQueue
            }</d:EndPointType>
            <d:Id m:null="true"/>
            <d:Name>${notificationEndPointName}</d:Name>
          </m:properties>
        </content>
      </entry>`
    };

    return new Promise<INotificationEndPoint>((resolve, reject) => {
      log.trace(
        'verbose',
        'AzureNotificationEndpoint request createAzureQueueNotificationEndPoint'
      );
      new Client().post(url, args, async (data, response) => {
        if (response.statusCode !== 201) {
          log.trace(
            'error',
            'AzureNotificationEndpoint createAzureQueueNotificationEndPoint error',
            {
              statusMessage: response.statusMessage,
              queueName,
              notificationEndPointName
            }
          );
          return reject(
            new Error(
              'AzureNotificationEndpoint createAzureQueueNotificationEndPoint error'
            )
          );
        } else {
          log.trace(
            'verbose',
            'AzureNotificationEndpoint createAzureQueueNotificationEndPoint complete'
          );
          const parsedData = (await this.xmlParseString_(data))['entry'][
            'content'
          ][0]['m:properties'][0];
          return resolve({
            // @ts-ignore
            id: parsedData['d:Id'][0],
            name: parsedData['d:Name'][0]
          });
        }
      });
    });
  }

  // Get a list of NotificationPoints, the query result returned by will be parsed through XML parse
  // {
  //   feed: {
  //     '$': {
  //       'xml:base': 'https://NotificationEndPoint-caea-1-hos-rest-1-1.cloudapp.net/api/',
  //        xmlns: 'http://www.w3.org/2005/Atom',
  //       'xmlns:d': 'http://schemas.microsoft.com/ado/2007/08/dataservices',
  //       'xmlns:m': 'http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'
  //     },
  //     id: 'https://NotificationEndPoint-caea-1-hos-rest-1-1.cloudapp.net/api/NotificationEndPoints',
  //     title: { _: 'NotificationEndPoints', '$': [Object] },
  //     updated: '2017-09-11T21:13:59Z',
  //     link: { '$': [Object] },
  //     entry: [
  //       [Object],
  //     ]
  //   }
  // }
  // The return result will be an array of NotificationEndPoints {id: string, name: string}
  public getNotificationEndPoints<INotificationEndPoint>(): Promise<
    ReadonlyArray<INotificationEndPoint>
  > {
    const url: string =
      config.get<string>('AZURE.MEDIA_SERVICE.REST_API_ENDPOINT') +
      'NotificationEndPoints';
    const args = {
      headers: this.createHeader_()
    };

    return new Promise<ReadonlyArray<INotificationEndPoint>>(
      (resolve, reject) => {
        log.trace('verbose', 'request getNotificationEndPoints');
        new Client().get(url, args, async (data, response) => {
          if (response.statusCode !== 200) {
            log.trace(
              'error',
              'AzureNotificationEndpoint getNotificationEndPoints error',
              {
                statusMessage: response.statusMessage
              }
            );
            return reject(
              new Error(
                'AzureNotificationEndpoint getNotificationEndPoints error'
              )
            );
          } else {
            log.trace(
              'verbose',
              'AzureNotificationEndpoint getNotificationEndPoints complete'
            );
            const parsedResult = (await this.xmlParseString_(data))['feed'][
              'entry'
            ];
            return resolve(
              parsedResult.map(data => {
                return {
                  id: data['content'][0]['m:properties'][0]['d:Id'][0],
                  name: data['content'][0]['m:properties'][0]['d:Name'][0]
                };
              })
            );
          }
        });
      }
    );
  }

  // Delete a NotificationPoint
  public deleteNotificationEndPoint(
    notificationEndPointId: string
  ): Promise<void> {
    const url: string = `${config.get<string>(
      'AZURE.MEDIA_SERVICE.REST_API_ENDPOINT'
    )}NotificationEndPoints('${notificationEndPointId}')`;
    const args = {
      headers: this.createHeader_()
    };

    return new Promise<void>((resolve, reject) => {
      log.trace(
        'verbose',
        'AzureNotificationEndpoint request deleteNotificationEndPoint'
      );
      new Client().delete(url, args, async (data, response) => {
        if (response.statusCode !== 204) {
          log.trace(
            'error',
            'AzureNotificationEndpoint deleteNotificationEndPoint error',
            {
              statusMessage: response.statusMessage,
              notificationEndPointId
            }
          );
          return reject(
            new Error(
              'AzureNotificationEndpoint deleteNotificationEndPoint error'
            )
          );
        } else {
          log.trace(
            'verbose',
            'AzureNotificationEndpoint deleteNotificationEndPoint complete'
          );
          return resolve();
        }
      });
    });
  }

  private createHeader_() {
    return {
      Authorization: 'Bearer ' + this.token,
      'x-ms-version': '2.17',
      Accept: 'application/atom+xml,application/xml',
      'Content-Type': 'application/atom+xml',
      DataServiceVersion: '1.0;NetFx',
      MaxDataServiceVersion: '3.0;NetFx'
    };
  }

  private xmlParseString_(data: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      log.trace('verbose', 'AzureNotificationEndpoint request xmlParseString_');
      xml2js.parseString(data, (err, result) => {
        if (err) {
          log.trace(
            'error',
            'AzureNotificationEndpoint xmlParseString_ error',
            {
              data: data
            }
          );
          return reject(
            new Error('AzureNotificationEndpoint xmlParseString_ error')
          );
        } else {
          log.trace(
            'verbose',
            'AzureNotificationEndpoint xmlParseString_ complete'
          );
          return resolve(result);
        }
      });
    });
  }
}
