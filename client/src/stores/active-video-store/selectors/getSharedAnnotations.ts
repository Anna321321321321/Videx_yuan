import { Map } from 'immutable';
import { createSelector } from 'reselect';
import Annotation from '../../annotations-store/Annotation';
import getAll from './getAll';

export default createSelector<any, Map<any, any>, Annotation[]>(
  getAll,
  (data) => data.get('sharedAnnotations')
);
