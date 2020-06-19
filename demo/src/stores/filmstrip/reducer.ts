import { fromJS } from 'immutable';
import ActionTypes from './actionTypes';

const INITIAL_STATE = fromJS({
  size: {
    height: null,
    width: null
  },
  initialized: false
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.RESIZE:
      return state
        .setIn(['size', 'height'], action.payload.height)
        .setIn(['size', 'width'], action.payload.width);

    case ActionTypes.DEINIT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
