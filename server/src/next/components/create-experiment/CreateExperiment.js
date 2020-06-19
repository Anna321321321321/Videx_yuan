import 'whatwg-fetch';
import React, { Component } from 'react';
import { Modal, Button, notification } from 'antd';
import CreateForm from './CreateForm';

export default class Create extends Component {
  state = {
    modal: false,
    form: {
      name: {
        value: null
      },
      treatments: {
        value: null
      }
    }
  };

  onClick = () => {
    this.setState({
      modal: true
    });
  };

  onCancel = () => {
    this.setState({
      modal: false,
      form: {
        name: {
          value: null
        },
        treatments: {
          value: null
        }
      }
    });
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
    await this.props.onSubmit(
      this.state.form.name.value,
      JSON.parse(this.state.form.treatments.value)
    );
    this.onCancel();
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.onClick}>
          Create Experiment
        </Button>
        <Modal
          title="Create Experiment"
          visible={this.state.modal}
          onCancel={this.onCancel}
          footer={null}
        >
          <CreateForm
            {...this.state.form}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Modal>
      </div>
    );
  }
}
