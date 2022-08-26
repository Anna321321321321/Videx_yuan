import {
  DEINIT,
  INIT,
  SET_PLAYLISTS,
  SHAREPUBLIC,
  GETAFROMLINK,
  INITSHARE,
  INITSHAREUPDATELINK,
  ISSHARED,
  ADDACCESSOR,
  GETACCESSOR,
} from './actionTypes';
import {
  deinit,
  init,
  setDuration,
  setPlaylists,
  sharePublic,
  getAnnotationsFromLink,
  initShare,
  initShareUpdateLink,
  isShared,
  addShareAccessor,
  getShareAccessor,
} from './actions';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors';

const actions = {
  init,
  deinit,
  setDuration,
  setPlaylists,
  sharePublic,
  getAnnotationsFromLink,
  initShare,
  initShareUpdateLink,
  isShared,
  addShareAccessor,
  getShareAccessor,
};

const actionTypes = {
  INIT,
  DEINIT,
  SET_PLAYLISTS,
  SHAREPUBLIC,
  GETAFROMLINK,
  INITSHARE,
  INITSHAREUPDATELINK,
  ISSHARED,
  ADDACCESSOR,
  GETACCESSOR,
};

export {
  constants,
  reducer,
  selectors,
  actions,
  actionTypes,
  getAnnotationsFromLink,
  initShare,
  initShareUpdateLink,
  isShared,
  addShareAccessor,
  getShareAccessor,
};
