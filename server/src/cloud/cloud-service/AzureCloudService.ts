import { AzureBlobStorage } from 'videx/server/cloud/blob-storage';
import { AzureMediaService } from 'videx/server/cloud/media-service';
import { AzureNotificationEndpoint } from 'videx/server/cloud/notification-endpoint';
import { AzureQueueStorage } from 'videx/server/cloud/queue-storage';
import ICloudService from './ICloudService';

export default class AzureCloudService implements ICloudService {
  public queue: AzureQueueStorage;
  public blob: AzureBlobStorage;
  public notification: AzureNotificationEndpoint;
  public media: AzureMediaService;

  public constructor(
    queue: AzureQueueStorage,
    blob: AzureBlobStorage,
    notification: AzureNotificationEndpoint,
    media: AzureMediaService
  ) {
    this.queue = queue;
    this.blob = blob;
    this.notification = notification;
    this.media = media;
  }

  public static async create() {
    const queue = new AzureQueueStorage();
    const blob = new AzureBlobStorage();
    const notification = await AzureNotificationEndpoint.create();
    const media = await AzureMediaService.create();
    return new AzureCloudService(queue, blob, notification, media);
  }
}
