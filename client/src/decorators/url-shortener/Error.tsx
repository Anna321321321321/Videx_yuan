import { Progress } from 'antd';
import React from 'react';

export default () => (
  <div
    style={{
      textAlign: 'center'
    }}
  >
    <Progress type="circle" status="exception" width={80} />
  </div>
);
