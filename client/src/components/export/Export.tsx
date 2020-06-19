import { Button } from 'antd';
import React from 'react';

interface IExportProps {
  onClickExport: () => void;
}

export default (props: IExportProps) => (
  <Button icon="export" onClick={props.onClickExport}>
    OneNote
  </Button>
);
