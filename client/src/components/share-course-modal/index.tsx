import { Button, Input, Modal, Spin, message } from 'antd';
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ShareCourseModelProps {
  link: string;
  visible: boolean;
  onCloseModal: () => void;
}

export default class ShareCourseModel extends Component<
  ShareCourseModelProps,
  null
> {
  render() {
    return (
      <Modal
        title="Link Created"
        closable={false}
        visible={this.props.visible}
        footer={
          this.props.link ? (
            <div>
              <CopyToClipboard
                text={this.props.link}
                onCopy={() => message.success('Copied')}
              >
                <Button icon="copy" />
              </CopyToClipboard>
              <Button type="primary" onClick={this.props.onCloseModal}>
                Close
              </Button>
            </div>
          ) : null
        }
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.props.link ? (
            <div>
              Anyone with this link can access this course.
              <div>
                <Input disabled={true} value={this.props.link} />
              </div>
            </div>
          ) : (
            <Spin />
          )}
        </div>
      </Modal>
    );
  }
}
