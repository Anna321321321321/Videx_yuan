export default interface IQueueStorage<T> {
  createQueueIfNotExists: () => Promise<string>;
  getMessage: () => Promise<T>;
  deleteMessage: (message: T) => Promise<void>;
  deleteQueue(): Promise<void>;
}
