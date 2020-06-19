import moment from 'moment';
import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { Icon, Label } from 'semantic-ui-react';

interface TranscriptTimestampProps {
  timestamp: number;
  onClickLabel: () => void;
  basic: boolean;
}

const enhance = compose(onlyUpdateForKeys(['timestamp', 'basic']));

export default enhance((props: TranscriptTimestampProps) => (
  <Label
    className="videx-transcript-timestamp"
    basic={props.basic}
    color="blue"
    size="tiny"
    ribbon={true}
    onClick={props.onClickLabel}
  >
    <Icon name="clock" />
    {moment(props.timestamp * 1000).format('mm:ss')}
  </Label>
));
