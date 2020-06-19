import { DEINIT, INIT, SET_PLAYLISTS } from './actionTypes';
import { deinit, init, setDuration, setPlaylists } from './actions';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors';

const actions = {
  init,
  deinit,
  setDuration,
  setPlaylists
};

const actionTypes = {
  INIT,
  DEINIT,
  SET_PLAYLISTS
};

export { constants, reducer, selectors, actions, actionTypes };
