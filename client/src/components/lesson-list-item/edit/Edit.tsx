import { Icon, Modal, Spin, Tooltip } from 'antd';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import APICaller from '../../../system/api-caller';
import Document from './Document';

const init = {
  modal: false,
  ready: false,
  form: {
    name: {
      value: null
    },
    summary: {
      value: null
    },
    transcript: {
      value: null
    },
    category: {
      value: null
    },
    releaseDate: {
      value: null
    }
  }
};

export default class EditLesson extends Component<any, any> {
  state = init;

  onFetch = async () => {
    APICaller.get(
      `/api/v4/courses/${this.props.courseId}/lessons/${
        this.props.lessonId
      }?edit=true`,
      value => {
        this.setState({
          ...this.state,
          ready: true,
          form: {
            name: {
              value: value.name
            },
            summary: {
              value: value.summary
            },
            transcript: {
              value: value.transcript
            },
            category: {
              value: value.category
            },
            releaseDate: {
              value: moment(value.releaseDate)
            }
          }
        });
      }
    );
  };

  onClick = async () => {
    this.setState({
      modal: true
    });
    await this.onFetch();
  };

  onCancel = () => {
    this.setState(init);
  };

  onChange = changedFields => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        ...changedFields
      }
    });
  };

  onSubmit = async () => {
    APICaller.put(
      `/api/v4/courses/${this.props.courseId}/lessons/${this.props.lessonId}`,
      JSON.stringify({
        name: this.state.form.name.value,
        transcript: this.state.form.transcript.value,
        summary: this.state.form.summary.value,
        releaseDate: this.state.form.releaseDate.value,
        category: this.state.form.category.value
      }),
      () => {
        this.setState(init);
        location.reload();
      }
    );
  };

  render() {
    return (
      <Fragment>
        <div onClick={this.onClick}>
          <Tooltip
            title="Allows you to edit lesson information and transcript."
            placement="right"
          >
            <Icon type="tool" />
            <br />
            <span style={{ fontSize: 'small' }}>Edit</span>
          </Tooltip>
        </div>
        <Modal
          title="Edit Lesson"
          visible={this.state.modal}
          onCancel={this.onCancel}
          footer={null}
          maskClosable={false}
        >
          {this.state.ready ? (
            <Document
              {...this.state.form}
              // @ts-ignore
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          ) : (
            <div
              style={{
                textAlign: 'center',
                margin: 'auto auto'
              }}
            >
              <Spin size={'large'} />
            </div>
          )}
        </Modal>
      </Fragment>
    );
  }
}
