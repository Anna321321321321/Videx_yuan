import { createSelector } from 'reselect';
import { NAME } from './constants';

const allData = state => state[NAME];

export const getSelectSection = createSelector<
  any,
  any,
  { start: number; end: number }
>(allData, data => data.get('range').toJS());

export const getSource = createSelector<any, any, 'filmstrip' | 'transcript'>(
  allData,
  data => data.get('source')
);

export const getStatus = createSelector<any, any, 'free' | 'busy' | 'end'>(
  allData,
  data => data.get('status')
);
