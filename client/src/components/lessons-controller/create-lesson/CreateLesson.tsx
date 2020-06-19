import { Button, Icon, Modal } from 'antd';
import React, { Component, Fragment } from 'react';
import CreateForm from './CreateForm';
import { Link } from 'react-router';

interface ICreateLessonProps {
  courseId: string;
}

interface ICreateLessonStates {
  modal: boolean;
  form: {
    name: {
      value: string;
    };
    summary: {
      value: string;
    };
    file: {
      value: any;
    };
    transcript: {
      value: string;
    };
    releaseDate: {
      value: Date;
    };
    category: {
      value: string;
    };
  };
  progress: {
    percent: number;
    status: string;
  };
}

const init = {
  modal: false,
  form: {
    name: {
      value: null
    },
    summary: {
      value: null
    },
    file: {
      value: null
    },
    transcript: {
      value: null
    },
    releaseDate: {
      value: null
    },
    category: {
      value: null
    }
  },
  progress: {
    percent: null,
    status: null
  }
};

export default class CreateLesson extends Component<
  ICreateLessonProps,
  ICreateLessonStates
> {
  state = init;

  onClick = () => {
    this.setState({
      modal: true
    });
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

  setStatus = status => {
    this.setState({
      ...this.state,
      progress: {
        ...this.state.progress,
        status: status
      }
    });
  };

  setPercent = percent => {
    this.setState({
      ...this.state,
      progress: {
        ...this.state.progress,
        percent: percent
      }
    });
  };

  getDuration = (file: Blob): Promise<number> => {
    return new Promise<number>(resolve => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = function() {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  onCreate = (formData, setStatus, setPercent) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `/api/v4/courses/${this.props.courseId}/lessons`, true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status > 300) {
          setStatus('exception');
        } else {
          setStatus('success');
        }
      }
    };
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        setPercent(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.send(formData);
    setPercent(0);
    setStatus('active');
  };

  onSubmit = async () => {
    const formData = new FormData();
    const file: Blob = this.state.form.file.value[0].originFileObj;
    const duration = await this.getDuration(file);

    formData.append('name', this.state.form.name.value);
    formData.append('summary', this.state.form.summary.value);
    formData.append('duration', duration.toString());
    formData.append('file', file);
    if (this.state.form.transcript.value) {
      formData.append('transcript', this.state.form.transcript.value);
    }
    formData.append('releaseDate', this.state.form.releaseDate.value);
    formData.append('category', this.state.form.category.value);

    this.onCreate(formData, this.setStatus, this.setPercent);
  };

  render() {
    return (
      <Fragment>
        <Button
          type="primary"
          onClick={this.onClick}
          style={{ borderRadius: 0 }}
        >
          <Icon type="diff" />Create Lesson
        </Button>
        <Modal
          title="Create Lesson"
          closable={this.state.progress.status !== 'active'}
          visible={this.state.modal}
          onCancel={this.onCancel}
          footer={null}
        >
          <CreateForm
            {...this.state.form}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            percent={this.state.progress.percent}
            status={this.state.progress.status}
          />
        </Modal>
      </Fragment>
    );
  }
}
