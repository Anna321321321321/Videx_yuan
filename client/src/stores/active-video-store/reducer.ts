import immutable, { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import _ from 'lodash';

const INITIAL_STATE: immutable.Map<any, any> = fromJS({
  courseId: null,
  id: null,
  name: null,
  duration: null,
  category: null,
  transcript: {
    text: null,
    file: null
  },
  video: {
    streaming: null
  },
  thumbnail: {
    url: null,
    height: null,
    width: null,
    sas: null
  },
  isInitialized: false,
  playlists: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return state.merge(action.payload).set('isInitialized', true);

    case actionTypes.DEINIT:
      return INITIAL_STATE;

    case actionTypes.SET_DURATION:
      return state.set('duration', action.payload.duration);

    case actionTypes.SET_PLAYLISTS:
      return state.set('playlists', action.payload.playlist);

    default:
      return state;
  }
};
