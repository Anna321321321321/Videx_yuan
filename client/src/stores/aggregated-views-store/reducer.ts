import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const INITIAL_STATE = fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH:
      return state.merge(
        action.payload.reduce((aggregator, view) => {
          for (let i = view.start; i <= view.end; i += 1) {
            if (typeof aggregator[i] !== 'undefined') {
              aggregator[i] += view.counter;
            } else {
              aggregator[i] = view.counter;
            }
          }
          return aggregator;
        }, {})
      );

    case actionTypes.DEINIT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
