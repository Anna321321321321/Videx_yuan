import { createSelector } from 'reselect';
import { NAME } from './constants';

const getAll = state => state[NAME];

export const getViews = createSelector<any, any, number>(getAll, data =>
  data.toJS()
);
