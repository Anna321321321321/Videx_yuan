import * as ActiveVideoStore from '../active-video-store';
import * as actions from './actions';

export const deinitEpic = action$ =>
  action$
    .ofType(ActiveVideoStore.actionTypes.DEINIT)
    .map(() => actions.deinit());
