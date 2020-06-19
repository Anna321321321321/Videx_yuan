import moment from 'moment';
import numToLength from './numToLength';

//convert timestamp format to HH:MM:SS or MM:SS
export default timestamp => {
  const hour = moment.duration(timestamp, 'seconds').hours();
  const minute = moment.duration(timestamp, 'seconds').minutes();
  const seconds = moment.duration(timestamp, 'seconds').seconds();
  if (hour === 0) {
    const stringTime = numToLength(minute) + ':' + numToLength(seconds);
    return stringTime;
  } else {
    const stringTime =
      numToLength(hour) +
      ':' +
      numToLength(minute) +
      ':' +
      numToLength(seconds);
    return stringTime;
  }
};
