import { createSelector } from 'reselect';
import { NAME } from './constants';

const allData = state => state[NAME];

export const flattenData = createSelector(allData, data => data.toJS());

export const getId = createSelector(allData, data => data.get('id'));

export const getType = createSelector(allData, data => data.get('type'));
