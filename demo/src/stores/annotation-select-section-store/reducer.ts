import immutable, { fromJS } from 'immutable';

import * as actionTypes from './actionTypes';

const INITIAL_STATE: immutable.Map<any, any> = fromJS({
  range: {
    start: null,
    end: null
  },
  source: null,
  status: 'free'
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.START:
      return state
        .setIn(['range', 'start'], action.payload.time)
        .setIn(['range', 'end'], action.payload.time)
        .set('source', action.payload.source)
        .set('status', 'busy');

    case actionTypes.IN_PROGRESS:
      return state.setIn(['range', 'end'], action.payload.time);

    case actionTypes.END:
      return state
        .setIn(['range', 'end'], action.payload.time)
        .set('status', 'end');

    case actionTypes.CLEAR:
      return state
        .setIn(['range', 'start'], null)
        .setIn(['range', 'end'], null)
        .set('source', null)
        .set('status', 'free');

    default:
      return state;
  }
};
