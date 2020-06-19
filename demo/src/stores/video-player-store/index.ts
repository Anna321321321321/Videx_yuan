import { TIME_UPDATE } from './actionTypes';
import * as actions from './actions';
import * as constants from './constants';
import * as epics from './epics';
import reducer from './reducer';
import * as selectors from './selectors';

const actionTypes = {
  TIME_UPDATE
};

export { constants, actions, epics, reducer, selectors, actionTypes };
