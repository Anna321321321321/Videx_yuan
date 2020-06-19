import { Map } from 'immutable';
import { createSelector } from 'reselect';
import getAll from './getAll';

export default createSelector<
  any,
  Map<any, any>,
  { start: number; end: number; text: string }[]
>(getAll, data => data.getIn(['transcript', 'text']).toJS());
