import { Map } from 'immutable';
import { createSelector } from 'reselect';
import getAll from './getAll';

export default createSelector<any, Map<any, any>, string>(getAll, data =>
  data.getIn(['video', 'streaming'])
);
