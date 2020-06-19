import moment from 'moment';
import { createSelector } from 'reselect';
import getMetadata from './getMetadata';
import getRawLessons from './getRawLessons';
import isInitialized from './isInitialized';

export default createSelector(
  getRawLessons,
  getMetadata,
  // prettier-ignore
  (lessons, metadata: any) => {
    const weeks = lessons.reduce(
      (accumulator, currentValue) => {
        accumulator.push(Math.floor(moment(currentValue.releaseDate).diff(moment(metadata.releaseDate), 'days') / 7 + 1));
        return accumulator;
      },
      []
    );
    return [...new Set(weeks)].sort();
  }
);
