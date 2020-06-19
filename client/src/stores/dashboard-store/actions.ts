import ActionCreator from '../../system/action-creator';
import APICaller from '../../system/api-caller';

export const types = {
  INIT: 'dashboard/INIT',
  DEINIT: 'dashboard/DEINIT',
  CALENDAR_FILTER: 'dashboard/CALENDAR_FILTER'
};

export const init = courseId => {
  return dispatch => {
    const getCourseData = new Promise((resolve, reject) => {
      APICaller.get(`/api/v4/dashboard/courses/${courseId}`, payload =>
        resolve({ ...payload })
      );
    });

    const getLessonVisitNameOverTime = new Promise((resolve, reject) => {
      APICaller.get(
        `/api/v4/dashboard/courses/${courseId}/analytics/getLessonVisitNameOverTime`,
        payload =>
          resolve({
            ...payload
          })
      );
    });

    const getTotalViewCountOverTime = new Promise((resolve, reject) => {
      APICaller.get(
        `/api/v4/dashboard/courses/${courseId}/analytics/getTotalViewCountOverTime`,
        payload =>
          resolve({
            ...payload
          })
      );
    });

    //total subscribers for this course
    const getActiveSubscribers = new Promise((resolve, reject) => {
      APICaller.get(
        `/api/v4/dashboard/courses/${courseId}/analytics/getActiveSubscribers`,
        payload =>
          resolve({
            ...payload
          })
      );
    });

    Promise.all([
      getCourseData,
      getLessonVisitNameOverTime,
      getActiveSubscribers,
      getTotalViewCountOverTime
    ]).then(values => {
      const combinedData = {
        ...values[0],
        ...values[1],
        ...values[2],
        ...values[3]
      };
      dispatch({
        payload: combinedData,
        type: types.INIT
      });
    });
  };
};

export const calendarFilter = payload => ({
  payload,
  type: types.CALENDAR_FILTER
});

export const deinit = ActionCreator(types.DEINIT);
