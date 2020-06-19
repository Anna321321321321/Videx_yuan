import './mongodb';
import user from './migrate/user';
import course from './migrate/course';
import lesson from './migrate/lesson';
import userlesson from './migrate/userlesson';

const admin = 'aa4416dd-cd26-461b-adb2-09e60a53a78b';

process.on('uncaughtException', e => console.log(e));
process.on('unhandledRejection', e => console.log(e));

const migrate = async () => {
  await user(admin);
  await course(admin);
  await lesson();
  await userlesson();
  process.exit(0);
};

migrate();
