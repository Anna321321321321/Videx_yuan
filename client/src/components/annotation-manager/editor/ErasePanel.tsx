import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { notification } from 'antd';

export default class ErasePanel extends Component<any, any> {
  render() {
    return (
      <Icon
        name="trash"
        onClick={() => {
          this.props.delete(this.props.annotation.id);
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
