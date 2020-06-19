import { Progress } from 'antd';
import React, { Fragment } from 'react';

export default () => (
  <Fragment>
    <Progress type="circle" percent={100} width={50} status="exception" />
    <div>
      Export unsuccessful. Please make sure your Microsoft Account has access to
      OneNote. You can check access permissions{' '}
      <a href="https://account.live.com/consent/Manage">here</a> and then try
      again. Otherwise, please create a bug ticket through our Online Feedback.
    </div>
  </Fragment>
);
