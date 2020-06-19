import { Col, Layout, Row } from 'antd';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import * as Logger from 'videx/client/logger';
import UserContainer from '../../container/user-container';

export default () => (
  <Layout.Header className="videx-header">
    <Row>
      <Col lg={4} md={6} sm={8} xs={10}>
        <Link
          className="videx-header-logo"
          onClick={() => Logger.event('App.Home.Click')}
          to="/"
        >
          <img
            className="videx-header-logo-img"
            alt="logo"
            src="/static/logo.png"
          />
          <span className="videx-header-logo-span">ViDeX</span>
        </Link>
      </Col>
      <Col lg={20} md={18} sm={16} xs={14}>
        <div className="videx-header-avatar">
          <UserContainer />
        </div>
      </Col>
    </Row>
  </Layout.Header>
);
