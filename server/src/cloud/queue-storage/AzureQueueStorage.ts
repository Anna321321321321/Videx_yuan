import * as azure from 'azure';
import * as config from 'config';
import log from 'videx/server/log';
import IQueueStorage from './IQueueStorage';

export interface IAzureQueueMessage {
  queue: string;
  messageId: string;
  popReceipt: string;
  messageText: string;
  messageObject: {
    MessageVersion: string;
    EventType: string;
    ETag: string;
    TimeStamp: string;
    Properties: any;
  };
  timeNextVisible: string;
  insertionTime: string;
  expirationTime: string;
  dequeueCount: number;
}

if (!config.has('AZURE.STORAGE.QUEUE_NAME')) {
  console.error('you need to edit variable.env file');
  process.exit(1);
}

export default class AzureQueueStorage
  implements IQueueStorage<IAzureQueueMessage> {
  private queueStorageService_ = azure.createQueueService(
    config.get<string>('AZURE.STORAGE.ACCOUNT'),
    config.get<string>('AZURE.STORAGE.ACCESS_KEY')
  );
  private queueName_ = `${config.util.getEnv('NODE_ENV')}-${config.get(
    'AZURE.STORAGE.QUEUE_NAME'
  )}`;

  // https://docs.microsoft.com/en-us/azure/storage/queues/storage-nodejs-how-to-use-queues
  public createQueueIfNotExists(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      log.trace('verbose', 'AzureQueueStorage request createQueueIfNotExists', {
        queueName: this.queueName_
      });
      this.queueStorageService_.createQueueIfNotExists(
        this.queueName_,
        (error, result, response) => {
          if (error) {
            log.trace(
              'error',
              'AzureQueueStorage createQueueIfNotExists error',
              {
                queueName: this.queueName_,
                error: JSON.stringify(error)
              }
            );
            return reject(
              new Error('AzureQueueStorage createQueueIfNotExists error')
            );
          }
          log.trace(
            'verbose',
            'AzureQueueStorage createQueueIfNotExists complete',
            {
              queueName: this.queueName_
            }
          );
          return resolve(this.queueName_);
        }
      );
    });
  }

  // https://docs.microsoft.com/en-us/azure/storage/queues/storage-nodejs-how-to-use-queues
  public getMessage(): Promise<IAzureQueueMessage> {
    return new Promise<IAzureQueueMessage>((resolve, reject) => {
      log.trace('verbose', 'AzureQueueStorage request getMessages', {
        queueName: this.queueName_
      });
      this.queueStorageService_.getMessage(
        this.queueName_,
        { visibilityTimeout: 5 * 60 },
        (error, result, response) => {
          if (error) {
            log.trace('error', 'AzureQueueStorage getMessages error', {
              queueName: this.queueName_,
              error: JSON.stringify(error)
            });
            return reject(new Error('AzureQueueStorage getMessages error'));
          }
          log.trace('verbose', 'AzureQueueStorage getMessages complete', {
            queueName: this.queueName_
          });
          if (result) {
            result.messageObject = JSON.parse(
              Buffer.from(result.messageText, 'base64').toString()
            );
          }
          return resolve(result);
        }
      );
    });
  }

  // https://docs.microsoft.com/en-us/azure/storage/queues/storage-nodejs-how-to-use-queues
  public deleteMessage(message: IAzureQueueMessage): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      log.trace('verbose', 'AzureQueueStorage request deleteMessage', {
        queueName: this.queueName_
      });
      this.queueStorageService_.deleteMessage(
        this.queueName_,
        message.messageId,
        message.popReceipt,
        (error, result, response) => {
          if (error) {
            log.trace('error', 'AzureQueueStorage deleteMessage error', {
              queueName: this.queueName_,
              error: JSON.stringify(error)
            });
            return reject(new Error('AzureQueueStorage deleteMessage error'));
          }
          log.trace('verbose', 'AzureQueueStorage deleteMessage complete', {
            queueName: this.queueName_
          });
          return resolve();
        }
      );
    });
  }

  // https://docs.microsoft.com/en-us/azure/storage/queues/storage-nodejs-how-to-use-queues
  public deleteQueue(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      log.trace('verbose', 'AzureQueueStorage request deleteQueue', {
        queueName: this.queueName_
      });
      this.queueStorageService_.deleteQueue(
        this.queueName_,
        (error, result, response) => {
          if (error) {
            log.trace('error', 'AzureQueueStorage deleteQueue error', {
              queueName: this.queueName_,
              error: JSON.stringify(error)
            });
            return reject(new Error('AzureQueueStorage deleteQueue error'));
          }
          log.trace('verbose', 'AzureQueueStorage deleteQueue complete', {
            queueName: this.queueName_
          });
          return resolve();
        }
      );
    });
  }
}
