import { Modal, Spin } from 'antd';
import React from 'react';
import * as rxjs from '../../../system/rxjs';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';

export default action$ =>
  action$.ofType(actionTypes.DELETE).mergeMap(action => {
    const { lessonId, courseId } = action.payload;
    const modal = Modal.info({
      title: 'We are processing your request',
      content: 'Please wait... This dialog will disappear automatically...'
    });
    return rxjs.ajax
      .del(`/api/v4/courses/${courseId}/lessons/${lessonId}`)
      .map(() => {
        modal.destroy();
        return actions.init(courseId);
      });
  });
