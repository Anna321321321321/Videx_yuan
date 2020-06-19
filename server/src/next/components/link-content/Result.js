import React, { Fragment } from 'react';
import { Progress, Button } from 'antd';

export default props => (
  <Fragment>
    {props.link && (
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Progress type="circle" percent={100} status="success" />
        <Button onClick={() => (location.href = props.link)}>Go To Page</Button>
      </div>
    )}
    {!props.link && (
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Progress type="circle" percent={100} status="exception" />
        <p>Please check your access token.</p>
      </div>
    )}
  </Fragment>
);
