import { createSelector } from 'reselect';
import getAll from './getAll';

export default createSelector(getAll, data => data.lessonCount);
