import { Button } from 'antd';
import React from 'react';

export default (Component, onClick: () => void) => (
  <div className="videx-export-hoc">
    <Component />
    <div>
      <Button onClick={onClick}>Close</Button>
    </div>
  </div>
);
