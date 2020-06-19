import { Map } from 'immutable';
import { createSelector } from 'reselect';
import getAll from './getAll';
import isInitialized from './isInitialized';

export default createSelector<any, Map<any, any>, boolean, any>(
  getAll,
  isInitialized,
  (data, isInitialized) => {
    if (!isInitialized) {
      return null;
    } else {
      return data.get('thumbnail').toJS();
    }
  }
);
