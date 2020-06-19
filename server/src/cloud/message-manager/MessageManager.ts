import { LessonStatus } from 'videx/api';
import {
  AzureCloudService,
  ICloudService
} from 'videx/server/cloud/cloud-service';
import log from 'videx/server/log';
import IMessageManager from './IMessageManager';

export default class MessageManager implements IMessageManager {
  private cloud: ICloudService;

  constructor(cloud: ICloudService) {
    this.cloud = cloud;
  }

  public static async create(): Promise<MessageManager> {
    const cloud = await AzureCloudService.create();
    await cloud.queue.createQueueIfNotExists();
    return new MessageManager(cloud);
  }

  private state2status_(state: string): LessonStatus {
    log.trace('verbose', 'MessageManager request state2status_');
    let result: LessonStatus;
    switch (state) {
      // map registered to queued, the notification endpoint won't send Queued state
      case 'Registered':
        result = LessonStatus.Queued;
        break;
      case 'Scheduled':
        result = LessonStatus.Scheduled;
        break;
      case 'Processing':
        result = LessonStatus.Processing;
        break;
      case 'Finished':
        result = LessonStatus.Finished;
        break;
      case 'Error':
        result = LessonStatus.Error;
        break;
      case 'Canceled':
        result = LessonStatus.Canceled;
        break;
      case 'Canceling':
        result = LessonStatus.Canceling;
        break;
      default:
        log.trace('error', 'MessageManager state2status_ error', { state });
        throw new Error('MessageManager state2status_ error');
    }
    log.trace('verbose', 'MessageManager state2status_ complete');
    return result;
  }

  public async getMessage(): Promise<{
    message: any;
    name: string;
    state: number;
    notificationEndPointId: string;
    jobId: string;
  }> {
    log.trace('info', 'MessageManager request getMessage');

    const message = await this.cloud.queue.getMessage();
    // return if message is null
    if (!message) {
      log.trace('info', 'MessageManager getMessage complete');
      return;
    }

    // There are 3 different kind of messages
    // 1. EventType: NotificationEndPointRegistration
    // 2. EventType: JobStateChange
    // 3. EventType: NotificationEndPointUnregistration
    const messageProperties = message.messageObject.Properties;
    let result;
    switch (message.messageObject.EventType) {
      case 'JobStateChange':
        result = {
          message: message,
          name: messageProperties.JobName,
          state: this.state2status_(messageProperties.NewState),
          notificationEndPointId: messageProperties.NotificationEndPointId,
          jobId: messageProperties.JobId
        };
        break;
      case 'NotificationEndPointRegistration':
        result = {
          message: message,
          name: messageProperties.Name,
          state: this.state2status_(messageProperties.State),
          notificationEndPointId: messageProperties.NotificationEndPointId,
          jobId: null
        };
        break;
      case 'NotificationEndPointUnregistration':
        break;
      default:
        log.trace('error', 'MessageManager getMessage error', {
          event: message.messageObject.EventType
        });
        throw new Error('MessageManager getMessage error');
    }
    log.trace('info', 'MessageManager getMessage complete');
    return result;
  }

  public async deleteNotificationEndPoint(
    notificationEndPointId: string
  ): Promise<void> {
    log.trace('info', 'MessageManager request deleteNotificationEndPoint');
    await this.cloud.notification.deleteNotificationEndPoint(
      notificationEndPointId
    );
    log.trace('info', 'MessageManager deleteNotificationEndPoint complete');
  }

  public async deleteMessage(message) {
    log.trace('info', 'MessageManager request deleteMessage');
    await this.cloud.queue.deleteMessage(message);
    log.trace('info', 'MessageManager deleteMessage complete');
  }
}
