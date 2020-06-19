import { Map } from 'immutable';
import { createSelector } from 'reselect';
import * as constants from './constants';

const getAll = state => state[constants.NAME];

export const getFilmstripSize = createSelector<
  any,
  Map<any, any>,
  { height: number; width: number }
>(getAll, data => data.get('size').toJS());
