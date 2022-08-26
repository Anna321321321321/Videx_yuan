import { Progress } from 'antd';
import React, { Fragment } from 'react';

export default ({ text }) => (
  <Fragment>
    <Progress type="circle" percent={100} width={50} />
    <div>
      Export success! You can find the exported page under the{' '}
      <b>Quick Notes</b> section in your default Notebook.
    </div>
  </Fragment>
);
