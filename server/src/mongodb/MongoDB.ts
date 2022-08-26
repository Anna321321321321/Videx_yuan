import * as config from 'config';
import * as mongoose from 'mongoose';
import CircuitBreaker from 'videx/server/core/circuit-breaker';
import log from 'videx/server/log';
import Mongoose from './Mongoose';
import { DEV_STAGING_DB, TEST_DB } from './constants';
import {
  AnnotationSchema,
  ConsentSchema,
  CourseSchema,
  ExperimentSchema,
  FlightSchema,
  HistorySchema,
  LessonSchema,
  LinkSchema,
  ReactionSchema,
  UserSchema,
  PlaylistSchema,
  ShareSchema,
} from './models';

(<any>mongoose).Promise = Promise;

const dbUrl = `mongodb://${config.get('DATABASE.MONGODB.HOST')}`;

const baseOptions = {
  autoReconnect: true,
  reconnectInterval: 10 * 1000,
  reconnectTries: Number.MAX_VALUE,
  promiseLibrary: global.Promise,
};

const NODE_ENV = config.util.getEnv('NODE_ENV');

// prettier-ignore
const options = NODE_ENV === 'production' || NODE_ENV === 'staging' ? { ...baseOptions, user: config.get('DATABASE.MONGODB.USER'), pass: config.get('DATABASE.MONGODB.SECRET') } : baseOptions;

export default class MongoDB {
  public static init(): Promise<void> {
    return new Promise(async (resolve) => {
      mongoose.connection.on('connected', () => {
        log.trace('info', 'MongoDB connected to server');
        mongoose.model('History', HistorySchema);
        mongoose.model('Course', CourseSchema);
        mongoose.model('Consent', ConsentSchema);
        mongoose.model('Lesson', LessonSchema);
        mongoose.model('User', UserSchema);
        mongoose.model('Flight', FlightSchema);
        mongoose.model('Link', LinkSchema);
        mongoose.model('Annotation', AnnotationSchema);
        mongoose.model('Experiment', ExperimentSchema);
        mongoose.model('Reaction', ReactionSchema);
        mongoose.model('Playlist', PlaylistSchema);
        mongoose.model('Share', ShareSchema);
        CircuitBreaker.close('mongodb');
        resolve();
      });

      mongoose.connection.on('disconnected', () => {
        log.trace('critical', 'MongoDB disconnect from server');
        CircuitBreaker.open('mongodb');
      });

      mongoose.connection.on('error', (err) => log.exception(err));

      process.once('SIGUSR2', () => {
        log.trace('info', `MongoDB nodemon restart`);
        process.kill(process.pid, 'SIGUSR2');
      });

      process.on('SIGINT', () => {
        log.trace('critical', `MongoDB app termination`);
        process.exit(0);
      });

      for (let i = 0; i < Number.MAX_SAFE_INTEGER; i += 1) {
        try {
          log.trace('info', 'MongoDB connecting to server ');
          await mongoose.connect(dbUrl, options);
          break;
        } catch (e) {
          log.trace('critical', 'MongoDB failed to connect to server ');
          const sleep = (): Promise<void> =>
            new Promise((resolve) => setTimeout(resolve, 10 * 1000));
          await sleep();
        }
      }
    });
  }

  public static async populateDB(): Promise<void> {
    log.trace('info', 'MongoDB request populateDB');
    switch (NODE_ENV) {
      case 'test':
        await MongoDB.populateDB_(TEST_DB);
        break;
      case 'development':
      case 'staging':
        if ((await Mongoose.find('Course', {})).length === 0) {
          await MongoDB.populateDB_(DEV_STAGING_DB);
        }
        break;
    }
    log.trace('info', 'MongoDB populateDB complete');
  }

  private static async populateDB_(value): Promise<void> {
    log.trace('warning', 'MongoDB request populateDB_');
    await MongoDB.destoryDB_();
    const keys = Object.keys(value);
    for (const key of keys) {
      for (const document of value[key]) {
        // @ts-ignore
        await Mongoose.create(key, document);
      }
    }
    log.trace('warning', 'MongoDB populateDB_ complete');
  }

  private static async destoryDB_(): Promise<void> {
    log.trace('critical', 'MongoDB request destoryDB_');
    await Mongoose.remove('User', {});
    await Mongoose.remove('Consent', {});
    await Mongoose.remove('Course', {});
    await Mongoose.remove('Lesson', {});
    await Mongoose.remove('History', {});
    await Mongoose.remove('Link', {});
    await Mongoose.remove('Flight', {});
    await Mongoose.remove('Annotation', {});
    await Mongoose.remove('Experiment', {});
    await Mongoose.remove('Reaction', {});
    await Mongoose.remove('Playlist', {});
    await Mongoose.remove('Share', {});
    log.trace('critical', 'MongoDB destoryDB_ complete');
  }
}
