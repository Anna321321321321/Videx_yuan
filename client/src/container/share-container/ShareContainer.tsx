import { Button, Popover } from 'antd';
import React, { Fragment } from 'react';
import {
  CancelHOC,
  Download,
  Error,
  Loading,
  Success,
  Share,
} from '../../components/annotation-sharing';
import { ShareStatus } from './constants';
import * as Logger from 'videx/client/logger';

interface ShareContainerProps {
  status: ShareStatus;
  pdfLink: string;
  onClickExportOneNote: () => void;
  onCancelProcessing: () => void;
}

const renderContent = (props: ShareContainerProps) => {
  switch (props.status) {
    case ShareStatus.Init:
      return (
        <Share onClickExport={props.onClickExportOneNote} />
        // <Download link={props.pdfLink} />
      );
    case ShareStatus.Processing:
      return CancelHOC(Loading, props.onCancelProcessing);
    case ShareStatus.Success:
      return CancelHOC(Success, props.onCancelProcessing);
    case ShareStatus.Error:
      return CancelHOC(Error, props.onCancelProcessing);
  }
};

export default (props: ShareContainerProps) => (
  <Popover
    title="Share Annotations"
    content={renderContent(props)}
    trigger="click"
  >
    <Button
      id="videxExportButton"
      icon="share"
      onClick={() => Logger.event('Share.Annotations.Open')}
      type="primary"
    >
      Share Annotations
    </Button>
  </Popover>
);
