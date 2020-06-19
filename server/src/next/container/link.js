import React, { Component, Fragment } from 'react';
import { Spin, Layout, notification } from 'antd';
import LinkContent from '../components/link-content';

export default class LinkContainer extends Component {
  onSubmit = async (token, onNext) => {
    const res = await fetch(`/api/v4/links/${token}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      onNext(null);
      return;
    }
    onNext((await res.json()).link);
    return;
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
        <LinkContent token={this.props.token} onSubmit={this.onSubmit} />
      </Layout.Content>
    );
  }
}
