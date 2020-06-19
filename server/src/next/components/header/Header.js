import { Layout } from 'antd';
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <Layout.Header
        style={{
          transition: 'opacity 0.5s',
          background: '#fff',
          marginBottom: '24px',
          padding: '0 48px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <img
          alt="logo"
          src="/static/logo.png"
          style={{
            height: '31px',
            lineHeight: '31px',
            marginRight: '8px'
          }}
        />
        <span
          style={{
            fontSize: '16px',
            fontFamily: "'Raleway', 'Hiragino Sans GB', sans-serif"
          }}
        >
          ViDeX
        </span>
      </Layout.Header>
    );
  }
}
