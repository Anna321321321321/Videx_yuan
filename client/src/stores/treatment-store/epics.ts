import * as rxjs from '../../system/rxjs';
import * as ActiveVideoStore from '../active-video-store';
import * as ErrorHandleStore from '../error-handle-store';
import * as actions from './actions';

export const fetchEpic = (action$, store) =>
  action$.ofType(ActiveVideoStore.actionTypes.INIT).mergeMap(() => {
    return rxjs.ajax
      .get(`/api/v4/flights`)
      .map(response => actions.init(response))
      .catch(ErrorHandleStore.actions.sendNotification);
  });
