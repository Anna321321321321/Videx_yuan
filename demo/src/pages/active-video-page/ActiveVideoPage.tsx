import { Layout } from 'antd';
import React from 'react';
import ActiveVideoContainer from '../../container/active-video-container';

export default props => (
  <Layout
    style={{
      minHeight: '100vh',
      maxHeight: '100vh'
    }}
  >
    <ActiveVideoContainer />
  </Layout>
);
