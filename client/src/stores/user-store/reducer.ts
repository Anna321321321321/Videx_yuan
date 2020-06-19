import { Map, fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const INITIAL_STATE: Map<any, any> = fromJS({
  id: null,
  name: null,
  email: null,
  type: null,
  initialized: false
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return state
        .set('id', action.payload.id)
        .set('name', action.payload.name)
        .set('type', action.payload.type)
        .set('email', action.payload.email)
        .set('initialized', true);

    default:
      return state;
  }
};
