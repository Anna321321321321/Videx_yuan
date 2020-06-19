import { Layout, Spin } from 'antd';
import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <Layout
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }
}
