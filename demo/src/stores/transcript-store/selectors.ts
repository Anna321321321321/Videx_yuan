import { createSelector } from 'reselect';
import { NAME } from './constants';

const getAll = state => state[NAME];

export const getAutoScroll = createSelector<any, any, boolean>(getAll, data =>
  data.get('autoScroll')
);
