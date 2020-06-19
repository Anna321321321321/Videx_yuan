import { createSelector } from 'reselect';
import { NAME } from './constants';

const getAll = state => state[NAME];

export const getViews = createSelector(getAll, data => data.toJS());
