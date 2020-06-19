import immutable, { fromJS } from 'immutable';
import * as Logger from 'videx/client/logger';
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
      Logger.event('SelectSection.Start', {
        source: state.get('source'),
        from: action.payload.time
      });
      return state
        .setIn(['range', 'start'], action.payload.time)
        .setIn(['range', 'end'], action.payload.time)
        .set('source', action.payload.source)
        .set('status', 'busy');

    case actionTypes.IN_PROGRESS:
      return state.setIn(['range', 'end'], action.payload.time);

    case actionTypes.END:
      Logger.event('SelectSection.End', {
        source: state.get('source'),
        from: state.getIn(['range', 'start']),
        to: state.getIn(['range', 'end'])
      });
      if (action.payload.time > state.getIn(['range', 'start'])) {
        return state
          .setIn(['range', 'end'], action.payload.time)
          .set('status', 'end');
      } else {
        const start = state.getIn(['range', 'start']);
        return state
          .setIn(['range', 'end'], start)
          .setIn(['range', 'start'], action.payload.time)
          .set('status', 'end');
      }

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
