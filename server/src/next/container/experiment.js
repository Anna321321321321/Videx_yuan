import React, { Component, Fragment } from 'react';
import { Spin, Layout, notification } from 'antd';
import CreateExperiment from '../components/create-experiment';
import ExperimentList from '../components/experiment-list';

export default class Experiment extends Component {
  state = {
    experiments: null
  };

  onFetch = async () => {
    const res = await fetch(`/api/v4/experiments`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!res.ok) {
      notification.error({
        message: 'Error',
        description: 'Please check your input or contact admin'
      });
    } else {
      this.setState({
        ...this.state,
        experiments: await res.json()
      });
    }
  };

  onDelete = async id => {
    this.setState({
      ...this.state,
      experiments: null
    });
    const res = await fetch(`/api/v4/experiments/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) {
      notification.error({
        message: 'Error',
        description: 'Please check your input or contact admin'
      });
    }
    this.onFetch();
  };

  componentDidMount() {
    this.onFetch();
  }

  onSubmit = async (name, treatments) => {
    this.setState({
      ...this.state,
      experiments: null
    });
    const res = await fetch(`/api/v4/experiments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        treatments: treatments
      })
    });
    if (!res.ok) {
      notification.error({
        message: 'Error',
        description: 'Please check your input or contact admin'
      });
    }
    this.onFetch();
  };

  render() {
    return (
      <Layout.Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 50px'
        }}
      >
        <CreateExperiment onSubmit={this.onSubmit} />
        <ExperimentList
          experiments={this.state.experiments}
          onDelete={this.onDelete}
        />
      </Layout.Content>
    );
  }
}
