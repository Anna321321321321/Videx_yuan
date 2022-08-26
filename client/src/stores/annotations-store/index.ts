import Annotation from './Annotation';
import {
  add,
  deselect,
  like,
  remove,
  select,
  share,
  unlike,
  update,
  ableSelectPrivate,
  disableSelectPrivate,
  sharedAnnotation,
  // initShare,
} from './actions';
import * as constants from './constants';
import * as epics from './epics';
import reducer from './reducer';
import * as selectors from './selectors';

const actions = {
  add,
  select,
  deselect,
  remove,
  update,
  unlike,
  like,
  share,
  ableSelectPrivate,
  disableSelectPrivate,
  sharedAnnotation,
  // initShare,
};

export { actions, constants, reducer, selectors, epics, Annotation };
