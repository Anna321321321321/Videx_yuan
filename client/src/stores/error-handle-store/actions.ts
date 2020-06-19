import { notification } from 'antd';
import { Observable } from 'rxjs/Observable';
import * as actionTypes from './actionTypes';

export const sendNotification = () => {
  notification.error({
    message: 'Server Error',
    description: 'Please Try Again'
  });
  return Observable.of({
    type: actionTypes.SEND_NOTIFICATION
  });
};
