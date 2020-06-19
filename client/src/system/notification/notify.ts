import { notification } from 'antd';
import * as CoreVersion from 'videx/client/core/version';
import constants from './constants';

const notify = (message, description, duration) =>
  notification.info({
    message,
    description,
    duration
  });

// we can inject fn unit test this function
export default (version: string, notifications = constants, fn = notify) =>
  notifications.forEach(value => {
    if (CoreVersion.compareVersion(version, value.version)) {
      fn(value.message, value.description, value.duration);
    }
  });
