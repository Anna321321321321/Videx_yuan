import * as ActiveVideoStore from '../../active-video-store';
import * as actions from '../actions';

export default action$ =>
  action$
    .ofType(ActiveVideoStore.actionTypes.DEINIT)
    .map(() => actions.deinit());
