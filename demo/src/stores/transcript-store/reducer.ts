import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const INITIAL_STATE = fromJS({
  autoScroll: true
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CONTROL_AUTO_SCROLL:
      return state.set('autoScroll', action.payload.enable);

    default:
      return state;
  }
}
