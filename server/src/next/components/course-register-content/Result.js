import React, { Fragment } from 'react';
import { Progress } from 'antd';

export default props => (
  <Fragment>
    {props.status === 'success' && (
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Progress type="circle" percent={100} status="success" />
        <p>You now have access to the course.</p>
      </div>
    )}
    {props.status === 'fail' && (
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Progress type="circle" percent={100} status="exception" />
        <p>Please check your access token or contact videx@ece.ubc.ca</p>
      </div>
    )}
  </Fragment>
);
