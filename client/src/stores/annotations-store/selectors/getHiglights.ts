import { createSelector } from 'reselect';
import Annotation from '../Annotation';
import getAll from './getAll';

export default createSelector<any, any, Annotation[]>(getAll, data => {
  return data.annotations.filter(item => item.color !== null);
});
