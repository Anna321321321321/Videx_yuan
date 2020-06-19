export default interface INotificationEndpoint {
  createWebHookNotificationEndPoint<T>(
    notificationEndPointName: string
  ): Promise<T>;
  createQueueNotificationEndPoint(
    notificationEndPointName: string,
    queueName: string
  ): Promise<any>;
  getNotificationEndPoints<T>(): Promise<ReadonlyArray<T>>;
  deleteNotificationEndPoint: (notificationEndPointId: string) => Promise<void>;
}
