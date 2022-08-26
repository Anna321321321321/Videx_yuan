import { createSelector } from 'reselect';
import Annotation from '../Annotation';
import getAll from './getAll';

export default createSelector<any, any, boolean>(
  getAll,
  (data) => data.selectPrivate
);
