import { Map } from 'immutable';
import { createSelector } from 'reselect';
import getAll from './getAll';

export default createSelector<any, Map<any, any>, boolean>(getAll, (data) =>
  data.get('accessedBy')
);
