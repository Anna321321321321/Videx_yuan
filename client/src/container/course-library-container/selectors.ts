import { createSelector } from 'reselect';
import { NAME } from './constants';

export const nestedData = state => state[NAME];

export const flattenData = createSelector(nestedData, data => ({
  courses: data.get('courses').toJS(),
  metadata: data.get('metadata').toJS(),
  initialized: data.get('initialized')
}));
