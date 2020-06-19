import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { notification } from 'antd';
import APICaller from '../../../system/api-caller';

const updateAnnotation = (id, lessonId, courseId, color) => {
  APICaller.put(
    `/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}`,
    JSON.stringify(color),
    () => {
      true;
    }
  );
};

export default class HighlightPanel extends Component<any, any> {
  updateHighlight = color => {
    const { id, lessonId, courseId } = this.props.annotation;
    updateAnnotation(id, lessonId, courseId, { color: color });
  };

  private ArrayColor: string[] = ['#fff110', '#28a3dc', '#4cba35', '#e32990'];

  render() {
    return (
      <Fragment>
        {this.ArrayColor.map((color, index) => (
          <Icon
            key={index}
            name="circle"
            className="videx-hover"
            size="large"
            style={{ color: color === null ? 'grey' : color }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.updateHighlight(color);
              notification.success({
                message: 'Success',
                description: 'Annotation Updated'
              });
            }}
          />
        ))}
        <Icon
          name="circle outline"
          className="videx-hover"
          style={{ color: 'white' }}
          size="large"
          onClick={e => {
            e.stopPropagation();
            this.updateHighlight(null);
          }}
        />
      </Fragment>
    );
  }
}
