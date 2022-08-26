import { Button } from 'antd';
import { Icon } from 'semantic-ui-react';
import React from 'react';
import * as AnnotationsStore from '../../stores/annotations-store';
interface IExportProps {
  onClickExport: () => void;
}
const share = AnnotationsStore.actions.share;
export default (props: IExportProps) => (
  <Icon
    name="linkify"
    size="large"
    className="videx-hover"
    style={{ color: 'grey' }}
    onClick={() => {
      this.props.share(null, {});
    }}
  />
  // <Button icon="export" onClick={props.onClickExport}>
  //   OneNote
  // </Button>
);
