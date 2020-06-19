import { notification } from 'antd';

export default () => {
  notification.error({
    message: `Request Failed`,
    description: `Please check your network connection or contact system administrators`
  });
};
