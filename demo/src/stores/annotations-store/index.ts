import Annotation from './Annotation';
import {
  add,
  added,
  deselect,
  like,
  remove,
  removed,
  select,
  share,
  unlike,
  update,
  updated
} from './actions';
import * as constants from './constants';
import * as epics from './epics';
import reducer from './reducer';
import * as selectors from './selectors';

const actions = {
  add,
  added,
  select,
  deselect,
  remove,
  removed,
  update,
  unlike,
  like,
  share,
  updated
};

export { actions, constants, reducer, selectors, epics, Annotation };
