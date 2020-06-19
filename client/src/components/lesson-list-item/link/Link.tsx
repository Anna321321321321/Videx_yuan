import React, { Component, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Icon, Modal, Input, Button } from 'antd';

export default class Link extends Component<any, any> {
  state = { modal: false };

  onClick = () => {
    this.setState({
      modal: true
    });
  };
  onCancel = () => {
    this.setState({ modal: false });
  };
  render() {
    return (
      <Fragment>
        <Modal
          title="Copy Lesson link"
          visible={this.state.modal}
          onCancel={this.onCancel}
          footer={null}
          maskClosable={false}
          width={1000}
        >
          <Input
            disabled={true}
            value={`${window.location.href}/lesson/${this.props.lessonId}`}
          />
          <CopyToClipboard
            text={`${window.location.href}/lesson/${this.props.lessonId}`}
            onCopy={() =>
              message.success(
                <span>
                  <b>Copy Successful:</b>
                  <br />
                  {`${window.location.href}/lesson/${this.props.lessonId}`}
                </span>,
                5
              )
            }
          >
            <Button>
              {' '}
              <Icon type="copy" />Copy
            </Button>
          </CopyToClipboard>
        </Modal>
        <span onClick={this.onClick}>
          <Icon type="link" />
          <br />
          <span style={{ fontSize: 'small' }}>Link</span>
        </span>
      </Fragment>
    );
  }
}
