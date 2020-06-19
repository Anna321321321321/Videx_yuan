import * as moment from 'moment';

export const string2date = (input: string): Date =>
  moment(input)
    .startOf('day')
    .toDate();
