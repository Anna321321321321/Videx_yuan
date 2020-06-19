import { Moment } from 'moment';

export default (data: Moment) =>
  data
    .millisecond(0)
    .seconds(0)
    .minutes(0)
    .hours(0);
