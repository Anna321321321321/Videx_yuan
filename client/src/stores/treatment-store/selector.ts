import { createSelector } from 'reselect';
import React, { PureComponent } from 'react';
import { NAME } from './constants';
import { Map } from 'immutable';

const getAll = state => state[NAME];

export const experiment = (state, id, component) => {
  return getAll(state)
    .get('experiments')
    .find(value => value.experimentId === id);
};
