import APICaller from '../../system/api-caller';
import * as HandleServerError from '../../system/handle-server-error';
import * as actionTypes from './actionTypes';
import * as Logger from 'videx/client/logger';

export const init = (courseId: string, lessonId: string) => (dispatch) =>
  APICaller.get(
    `/api/v4/courses/${courseId}/lessons/${lessonId}`,
    (payload) =>
      APICaller.get(
        `/api/v4/courses/${courseId}/lessons/${lessonId}/histories`,
        (historyData) => {
          if (
            historyData !== null ||
            historyData !== undefined ||
            historyData !== {}
          ) {
            if (historyData.counter === 1) {
              Logger.event('Lesson.View.First', {
                courseId: courseId,
                lessonId: lessonId,
              });
            } else {
              Logger.event('Lesson.View.Revisit', {
                courseId: courseId,
                lessonId: lessonId,
              });
            }
          }
          return dispatch({ payload, type: actionTypes.INIT });
        },
        () => dispatch({ payload, type: actionTypes.INIT })
      ),
    (response) => HandleServerError.redirect(response.status)
  );
export const initShare = (courseId: string, lessonId: string, link: string) => (
  dispatch
) =>
  APICaller.get(
    `/api/v4/courses/${courseId}/lessons/${lessonId}`,
    (payload) =>
      APICaller.get(
        `/api/v4/courses/${courseId}/lessons/${lessonId}/histories`,
        (historyData) => {
          if (
            historyData !== null ||
            historyData !== undefined ||
            historyData !== {}
          ) {
            if (historyData.counter === 1) {
              Logger.event('Lesson.View.First', {
                courseId: courseId,
                lessonId: lessonId,
              });
            } else {
              Logger.event('Lesson.View.Revisit', {
                courseId: courseId,
                lessonId: lessonId,
              });
            }
          }
          return dispatch({
            payload: { link },
            type: actionTypes.INITSHARE,
          });
        },
        () => dispatch({ payload: { link }, type: actionTypes.INITSHARE })
      ),
    (response) => HandleServerError.redirect(response.status)
  );

export const setPlaylists = (courseId: string) => (dispatch) =>
  APICaller.get(`/api/v4/playlist/${courseId}`, (payload) => {
    return dispatch({ payload, type: actionTypes.SET_PLAYLISTS });
  });
export const sharePublic = (courseId: string, lessonId: string) => (dispatch) =>
  APICaller.get(
    `/api/v4/courses/${courseId}/lessons/${lessonId}/share`,
    (payload) => {
      return dispatch({ payload, type: actionTypes.SHAREPUBLIC });
    }
  );
export const addShareAccessor = (link: string) => (dispatch) =>
  APICaller.post(
    `/api/v4/courses/lessons/share/${link}/accessor`,
    {},
    (payload) => {
      return dispatch({ payload, type: actionTypes.ADDACCESSOR });
    }
  );
export const getShareAccessor = (link: string) => (dispatch) =>
  APICaller.get(`/api/v4/courses/lessons/share/${link}/accessor`, (payload) => {
    return dispatch({ payload, type: actionTypes.GETACCESSOR });
  });
export const getAnnotationsFromLink = (link: string) => (dispatch) =>
  APICaller.get(`/api/v4/courses/lessons/share/${link}`, (payload) => {
    return dispatch({ payload, type: actionTypes.GETAFROMLINK });
  });
export const deinit = () => ({ type: actionTypes.DEINIT });
export const isShared = () => ({ type: actionTypes.ISSHARED });
export const initShareUpdateLink = (link: string) => ({
  type: actionTypes.INITSHAREUPDATELINK,
  payload: { link },
});
export const setDuration = (duration: number) => ({
  type: actionTypes.SET_DURATION,
  payload: { duration },
});
