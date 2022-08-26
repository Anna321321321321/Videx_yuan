import { Button } from 'antd';
import React from 'react';
import * as Logger from 'videx/client/logger';

export default ({ link }) => (
  <Button
    icon="export"
    onClick={() => {
      window.open(link);
      Logger.event('Export.Annotations.PDF');
    }}
  >
    PDF
  </Button>
);
