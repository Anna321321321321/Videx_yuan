import mongoose from 'mongoose';
import './models/v2';
import './models/v3';

mongoose.Promise = Promise;

const connect = () => {
  mongoose.connect(
    'mongodb://mongodb',
    {
      promiseLibrary: global.Promise
    }
  );
};

connect();

mongoose.connection.on('connected', () => {
  console.log('Mongoose Connected to Database');
});

mongoose.connection.on('error', err => {
  // If first connect fails because mongod is down, try again later.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (
    err.message &&
    err.message.match(/failed to connect to server .* on first connect/)
  ) {
    // Wait for a bit, then try to connect again
    setTimeout(() => {
      connect();
    }, 10 * 1000);
  } else {
    log.exception(new Error(err));
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose Disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose Disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('Nodemon Restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('App Termination', () => {
    process.exit(0);
  });
});
