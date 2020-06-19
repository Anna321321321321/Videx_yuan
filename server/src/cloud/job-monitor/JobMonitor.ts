import { LessonStatus } from 'videx/api';
import { LessonManager } from 'videx/server/cloud/lesson-manager';
import {
  IMessageManager,
  MessageManager
} from 'videx/server/cloud/message-manager';
import log from 'videx/server/log';
import IJobMonitor from './IJobMonitor';

export default class JobMonitor implements IJobMonitor {
  private messageManager: IMessageManager;

  constructor(messageManager: IMessageManager) {
    this.messageManager = messageManager;
  }

  public static async create() {
    const messageManager = await MessageManager.create();
    const thread = async (jobMonitor: JobMonitor) => {
      try {
        const information = await jobMonitor.messageManager.getMessage();
        if (information) {
          const {
            message,
            name,
            state,
            notificationEndPointId,
            jobId
          } = information;
          const lessonManager = await LessonManager.create(name);
          await lessonManager.postProcess(state, jobId);
          if (state === LessonStatus.Error || state === LessonStatus.Finished) {
            await jobMonitor.messageManager.deleteNotificationEndPoint(
              notificationEndPointId
            );
          }
          await jobMonitor.messageManager.deleteMessage(message);
        }
      } catch (e) {
        log.exception(e);
      } finally {
        setTimeout(() => thread(new JobMonitor(messageManager)), 30000);
      }
    };
    thread(new JobMonitor(messageManager));
  }
}
