import * as rxjs from '../../system/rxjs';
import * as ActiveVideoStore from '../active-video-store';
import * as ErrorHandleStore from '../error-handle-store';
import * as VideoPlayerStore from '../video-player-store';
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
        .get(`/api/v4/courses/${courseId}/lessons/${lessonId}/histories/views`)
        .map(response => actions.fetch(response))
        .catch(ErrorHandleStore.actions.sendNotification);
    });

export const deinitEpic = action$ =>
  action$
    .ofType(ActiveVideoStore.actionTypes.DEINIT)
    .map(() => actions.deinit());

export const postEpic = (action$, store) =>
  action$
    .ofType(VideoPlayerStore.actionTypes.TIME_UPDATE)
    .pluck('payload', 'time')
    .bufferTime(10000)
    .filter(
      value =>
        value.length !== 0 &&
        ActiveVideoStore.selectors.getIds(store.getState())
    )
    .mergeMap(value => {
      const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(
        store.getState()
      );
      return rxjs.ajax
        .post(
          `/api/v4/courses/${courseId}/lessons/${lessonId}/histories/views`,
          { views: value }
        )
        .map(() => actions.post(value))
        .catch(ErrorHandleStore.actions.sendNotification);
    });
