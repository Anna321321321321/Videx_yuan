import immutable, { fromJS } from 'immutable';
import * as actions from './actions';

const INITIAL_STATE: immutable.Map<any, any> = fromJS({
  courses: [],
  metadata: {
    adminAccess: false
  },
  initialized: false
});

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.types.INIT:
      return state.merge(action.payload).set('initialized', true);

    case actions.types.DEINIT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
