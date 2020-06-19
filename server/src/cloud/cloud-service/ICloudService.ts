import { IBlobStorage } from 'videx/server/cloud/blob-storage';
import { IMediaService } from 'videx/server/cloud/media-service';
import { INotificationEndpoint } from 'videx/server/cloud/notification-endpoint';
import {
  IAzureQueueMessage,
  IQueueStorage
} from 'videx/server/cloud/queue-storage';

export default interface ICloudService {
  media: IMediaService;
  blob: IBlobStorage;
  queue: IQueueStorage<IAzureQueueMessage>;
  notification: INotificationEndpoint;
}
