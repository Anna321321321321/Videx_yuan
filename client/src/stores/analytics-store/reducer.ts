import { fromJS } from 'immutable';
import * as ActionTypes from './actionTypes';

const INITIAL_STATE = fromJS({
  size: {
    height: null,
    width: null
  },
  initialized: false,
  analytics: {
    annotations: null,
    pauses: null,
    lessonSeeks: null
  }
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SETSIZE:
      return state
        .setIn(['size', 'width'], action.payload.width)
        .setIn(['size', 'height'], action.payload.height);

    case ActionTypes.DEINIT:
      return INITIAL_STATE;

    case ActionTypes.GET_ANALYTICS:
      let lessonCount = action.payload.lessonAnnotation.rows.reduce(
        (map, item) => {
          let obj = {
            start: 0,
            end: 0
          };
          obj['start'] = parseInt(item[0]);
          obj['end'] = parseInt(item[1]);
          map.push(obj);
          return map;
        },
        []
      );

      let lessonSeeks = action.payload.lessonSeeks.rows.reduce((map, item) => {
        let obj = {
          start: 0,
          end: 0,
          count: 0
        };
        obj['start'] = parseInt(item[0]);
        obj['end'] = parseInt(item[1]);
        obj['count'] = item[2];
        map.push(obj);
        return map;
      }, []);
      let pauseCount = action.payload.lessonPauses.rows.reduce((map, item) => {
        let obj = {
          videoTimestamp: 0,
          count: 0
        };
        obj['videoTimestamp'] = parseInt(item[0]);
        obj['count'] = parseInt(item[1]);
        map.push(obj);
        return map;
      }, []);
      return state
        .setIn(['analytics', 'annotations'], lessonCount)
        .setIn(['analytics', 'pauses'], pauseCount)
        .setIn(['analytics', 'lessonSeeks'], lessonSeeks)
        .set('isInitialized', true);

    default:
      return state;
  }
}
