import { Button, Popover } from 'antd';
import React, { Fragment } from 'react';
import {
  CancelHOC,
  Download,
  Error,
  Export,
  Loading,
  Success
} from '../../components/export';
import { ExportStatus } from './constants';
import * as Logger from 'videx/client/logger';

interface ExportContainerProps {
  status: ExportStatus;
  pdfLink: string;
  onClickExportOneNote: () => void;
  onCancelProcessing: () => void;
}

const renderContent = (props: ExportContainerProps) => {
  switch (props.status) {
    case ExportStatus.Init:
      return (
        <Fragment>
          <Export onClickExport={props.onClickExportOneNote} />
          <Download link={props.pdfLink} />
        </Fragment>
      );
    case ExportStatus.Processing:
      return CancelHOC(Loading, props.onCancelProcessing);
    case ExportStatus.Success:
      return CancelHOC(Success, props.onCancelProcessing);
    case ExportStatus.Error:
      return CancelHOC(Error, props.onCancelProcessing);
  }
};

export default (props: ExportContainerProps) => (
  <Popover
    title="Export Annotations"
    content={renderContent(props)}
    trigger="click"
  >
    <Button
      id="videxExportButton"
      icon="export"
      onClick={() => Logger.event('Export.Annotations.Open')}
      type="primary"
    >
      Export Annotations
    </Button>
  </Popover>
);
