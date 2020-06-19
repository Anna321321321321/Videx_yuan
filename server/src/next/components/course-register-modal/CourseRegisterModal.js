import { Modal, Spin, Progress, Button } from 'antd';
import React, { Component } from 'react';

export default class CourseRegisterModal extends Component {
  renderFooter = () => {
    if (this.props.status === 'process') {
      return null;
    } else {
      return (
        <Button type="primary">
          <a href={'/'}>Home</a>
        </Button>
      );
    }
  };

  renderMessage = () => {
    if (this.props.status === 'error') {
      return (
        <div>Please check the invitation link or contact the instructor.</div>
      );
    }
  };

  renderIndicator = () => {
    if (this.props.status === 'process') {
      return <Spin size="large" />;
    } else if (this.props.status === 'error') {
      return (
        <Progress
          type="dashboard"
          percent={100}
          status="exception"
          format={() => 'Error'}
        />
      );
    } else if (this.props.status === 'finish') {
      return (
        <Progress
          type="dashboard"
          status="success"
          percent={100}
          format={() => 'Success'}
        />
      );
    }
  };

  render() {
    return (
      <Modal
        title="Register Course"
        closable={false}
        visible={this.props.visible}
        footer={this.renderFooter()}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh'
          }}
        >
          <div>{this.renderIndicator()}</div>
          {this.renderMessage()}
        </div>
      </Modal>
    );
  }
}
