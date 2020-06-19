import * as ActionTypes from './actionTypes';
import APICaller from '../../system/api-caller';

export const setSize = payload => ({ payload, type: ActionTypes.SETSIZE });

export const deinit = () => ({ type: ActionTypes.DEINIT });

export const getAnalytics = (
  courseId: string,
  lessonId: string
) => dispatch => {
  const getAnnotationsCount = new Promise((resolve, reject) => {
    APICaller.get(
      `/api/v4//dashboard/courses/${courseId}/lesson/${lessonId}/analytics/getLessonAnnotation`,
      payload =>
        resolve({
          ...payload
        })
    );
  });

  const getPausesCount = new Promise((resolve, reject) => {
    APICaller.get(
      `/api/v4//dashboard/courses/${courseId}/lesson/${lessonId}/analytics/getLessonPauses`,
      payload =>
        resolve({
          ...payload
        })
    );
  });

  const getLessonSeeks = new Promise((resolve, reject) => {
    APICaller.get(
      `/api/v4//dashboard/courses/${courseId}/lesson/${lessonId}/analytics/getLessonSeeks`,
      payload =>
        resolve({
          ...payload
        })
    );
  });

  Promise.all([getAnnotationsCount, getPausesCount, getLessonSeeks]).then(
    values => {
      const combinedData = {
        ...values[0],
        ...values[1],
        ...values[2]
      };
      dispatch({
        payload: combinedData,
        type: ActionTypes.GET_ANALYTICS
      });
    }
  );
};
