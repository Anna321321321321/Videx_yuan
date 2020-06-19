import { Map } from 'immutable';
import { createSelector } from 'reselect';
import * as constants from './constants';

const getAll = state => state[constants.NAME];

export const getSize = createSelector<
  any,
  Map<any, any>,
  { height: number; width: number }
>(getAll, data => data.get('size').toJS());

export const getAnalytics = createSelector<any, Map<any, any>, any>(
  getAll,
  data => data.get('analytics').toJS()
);

export const isInitialized = createSelector<any, Map<any, any>, boolean>(
  getAll,
  data => data.get('isInitialized')
);
