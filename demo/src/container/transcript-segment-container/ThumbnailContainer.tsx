import React from 'react';
import { Thumbnail } from '../../components/transcript-thumbnail';
import { branch, compose, renderNothing, onlyUpdateForKeys } from 'recompose';

const enhance = compose(
  branch(props => props.thumbnail === null, renderNothing),
  onlyUpdateForKeys(['transcript', 'thumbnail'])
);

export default enhance(props => {
  return (
    <Thumbnail
      segment={{
        start: props.transcript.getIn(['range', 'start']),
        end: props.transcript.getIn(['range', 'end'])
      }}
      thumbnail={props.thumbnail}
      key={props.index1}
    />
  );
});
