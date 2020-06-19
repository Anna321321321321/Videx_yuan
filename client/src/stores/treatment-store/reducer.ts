import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const INITIAL_STATE = fromJS({
  experiments: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return state.set('experiments', action.payload);

    default:
      return state;
  }
};
