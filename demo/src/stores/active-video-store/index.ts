import { DEINIT, INIT } from './actionTypes';
import { deinit, init, setDuration } from './actions';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors';

const actions = {
  init,
  deinit,
  setDuration
};

const actionTypes = {
  INIT,
  DEINIT
};

export { constants, reducer, selectors, actions, actionTypes };
