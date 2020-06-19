import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const INITIAL_STATE = fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.POST:
      return action.payload.reduce(
        (aggregator, time: number) =>
          aggregator.update(time.toString(), (value = 0) => value + 1),
        state
      );

    default:
      return state;
  }
};
