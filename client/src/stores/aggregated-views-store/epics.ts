import * as rxjs from '../../system/rxjs';
import * as ActiveVideoStore from '../active-video-store';
import * as ErrorHandleStore from '../error-handle-store';
import * as actions from './actions';

export const fetchEpic = (action$, store) =>
  action$
    .ofType(ActiveVideoStore.actionTypes.INIT)
    .filter(() => ActiveVideoStore.selectors.getIds(store.getState()))
    .mergeMap(() => {
      const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(
        store.getState()
      );
      return rxjs.ajax
        .get(`/api/v4/courses/${courseId}/lessons/${lessonId}/views`)
        .map(response => actions.fetch(response))
        .catch(ErrorHandleStore.actions.sendNotification);
    });

export const deinitEpic = action$ =>
  action$
    .ofType(ActiveVideoStore.actionTypes.DEINIT)
    .map(() => actions.deinit());
