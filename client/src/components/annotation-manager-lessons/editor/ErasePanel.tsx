import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { notification } from 'antd';
import APICaller from '../../../system/api-caller';

const deleteAnnotation = (id, lessonId, courseId) => {
  APICaller.del(
    `/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}`,
    new Headers({
      'Content-Type': 'application/json'
    }),
    JSON.stringify({}),
    () => {
      true;
    }
  );
};

export default class ErasePanel extends Component<any, any> {
  render() {
    return (
      <Icon
        name="trash"
        onClick={() => {
          deleteAnnotation(
            this.props.annotation.id,
            this.props.annotation.lessonId,
            this.props.annotation.courseId
          );
          notification.success({
            message: 'Success',
            description: 'Annotation Deleted'
          });
          if (this.props.onClickHandle !== null) {
            this.props.onClickHandle();
          }
        }}
        size="large"
        className="videx-hover"
      />
    );
  }
}
