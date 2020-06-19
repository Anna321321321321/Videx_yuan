import { LessonStatus } from 'videx/api';

export default interface IMessageManager {
  getMessage: () => Promise<{
    message: any;
    name: string;
    state: LessonStatus;
    notificationEndPointId: string;
    jobId: string;
  }>;
  deleteNotificationEndPoint: (notificationEndPointId: string) => Promise<void>;
  deleteMessage: (message) => Promise<void>;
}
