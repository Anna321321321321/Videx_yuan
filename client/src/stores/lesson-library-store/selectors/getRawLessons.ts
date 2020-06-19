import { createSelector } from 'reselect';
import * as helpers from '../helpers';
import getAll from './getAll';

export default createSelector(getAll, data =>
  data.lessons.sort(helpers.sortLessons)
);
