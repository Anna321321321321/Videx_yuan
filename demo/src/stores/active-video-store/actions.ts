import * as actionTypes from './actionTypes';

export const init = (courseId: string, lessonId: string) => dispatch =>
  // APICaller.get(
  //   `/api/v4/courses/${courseId}/lessons/${lessonId}`,
  //   payload =>
  //     APICaller.get(
  //       `/api/v4/courses/${courseId}/lessons/${lessonId}/histories`,
  //       () => dispatch({ payload, type: actionTypes.INIT }),
  //       () => dispatch({ payload, type: actionTypes.INIT })
  //     ),
  //   response => HandleServerError.redirect(response.status)
  dispatch({ type: actionTypes.INIT });

export const deinit = () => ({ type: actionTypes.DEINIT });

export const setDuration = (duration: number) => ({
  type: actionTypes.SET_DURATION,
  payload: { duration }
});
