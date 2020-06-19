import APICaller from '../../system/api-caller';
import * as actionTypes from './actionTypes';
import _ from 'lodash';

export const init = id => dispatch => {
  const getLessonInfo = new Promise((resolve, reject) => {
    APICaller.get(`/api/v4/courses/${id}/lessons`, payload =>
      resolve({
        ...payload
      })
    );
  });

  // get total sessions per lesson for course
  const getSessionsPerLesson = getLessonInfo.then(value => {
    if (value['metadata'].adminAccess) {
      return new Promise((resolve, reject) => {
        APICaller.get(
          `/api/v4/dashboard/courses/${id}/analytics/getSessionsPerLesson`,
          payload =>
            resolve({
              ...payload
            })
        );
      });
    } else {
      return null;
    }
  });

  // get total sessions per lesson for course
  const getUniqueSessionsPerLesson = getLessonInfo.then(value => {
    if (value['metadata'].adminAccess) {
      return new Promise((resolve, reject) => {
        APICaller.get(
          `/api/v4/dashboard/courses/${id}/analytics/getUniqueSessionsPerLesson`,
          payload =>
            resolve({
              ...payload
            })
        );
      });
    } else {
      return null;
    }
  });

  //total subscribers for this course
  const getActiveSubscribers = getLessonInfo.then(value => {
    if (value['metadata'].adminAccess) {
      return new Promise((resolve, reject) => {
        APICaller.get(
          `/api/v4/dashboard/courses/${id}/analytics/getActiveSubscribers`,
          payload =>
            resolve({
              ...payload
            })
        );
      });
    } else {
      return null;
    }
  });

  const getAverageViewTime = getLessonInfo.then(value => {
    if (value['metadata'].adminAccess) {
      return new Promise((resolve, reject) => {
        APICaller.get(
          `/api/v4/dashboard/courses/${id}/analytics/getAverageViewTime`,
          payload =>
            resolve({
              ...payload
            })
        );
      });
    } else {
      return null;
    }
  });

  const getCourseAnnotations = getLessonInfo.then(value => {
    if (value['metadata'].adminAccess) {
      return new Promise((resolve, reject) => {
        APICaller.get(
          `/api/v4/dashboard/courses/${id}/analytics/getCourseAnnotations`,
          payload =>
            resolve({
              ...payload
            })
        );
      });
    } else {
      return null;
    }
  });

  const getCoursePauses = getLessonInfo.then(value => {
    if (value['metadata'].adminAccess) {
      return new Promise((resolve, reject) => {
        APICaller.get(
          `/api/v4/dashboard/courses/${id}/analytics/getCoursePauses`,
          payload =>
            resolve({
              ...payload
            })
        );
      });
    } else {
      return null;
    }
  });

  const updateConsent = new Promise((resolve, reject) => {
    APICaller.get(`/api/v4/consent/email/`, value => resolve({ ...value }));
  });

  updateConsent.then((value: any) => {
    if (value !== null || !_.isEmpty(value)) {
      if (value.userId === null) {
        APICaller.put(
          `/api/v4/consent/${value._id}`,
          JSON.stringify({
            userEmail: value.userEmail
          }),
          () => {}
        );
      }
    }
  });

  Promise.all([
    updateConsent,
    getSessionsPerLesson,
    getLessonInfo,
    getAverageViewTime,
    getActiveSubscribers,
    getUniqueSessionsPerLesson,
    getCourseAnnotations,
    getCoursePauses
  ]).then(values => {
    const combinedData = {
      ...values[1],
      ...values[2],
      ...values[3],
      ...values[4],
      ...values[5],
      ...values[6],
      ...values[7]
    };
    dispatch({
      payload: combinedData,
      type: actionTypes.INIT
    });
  });
};

export const deinit = () => ({ type: actionTypes.DEINIT });

export const publish = (courseId, lessonId, publish) => dispatch => {
  APICaller.put(
    `/api/v4/courses/${courseId}/lessons/${lessonId}`,
    JSON.stringify({
      publish
    }),
    () => dispatch(init(courseId))
  );
};

export const search = value => ({
  type: actionTypes.SEARCH,
  payload: value
});

export const searchSuccess = value => ({
  type: actionTypes.SEARCH_SUCCESS,
  payload: value
});

export const searchReset = () => ({
  type: actionTypes.SEARCH_RESET
});

export const selectWeek = week => ({
  type: actionTypes.SELECT_WEEK,
  payload: week
});

export const selectCategory = category => ({
  type: actionTypes.SELECT_CATEGORY,
  payload: category
});

export const del = (courseId, lessonId) => ({
  type: actionTypes.DELETE,
  payload: { courseId, lessonId }
});

export const changeAnalyticsMode = () => ({
  type: actionTypes.SHOW_ANALYTICS
});

export const changeShowDrawer = () => ({
  type: actionTypes.SHOW_DRAWER
});
