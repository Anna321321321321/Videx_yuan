import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Button, Icon } from 'semantic-ui-react';
import * as VideoPlayerStore from '../../stores/video-player-store';

const actions = {
  skipForward: VideoPlayerStore.actions.skipForward,
  skipBackward: VideoPlayerStore.actions.skipBackward
};

const enhance = compose(
  connect(
    null,
    actions
  ),
  withHandlers({
    onClickVideoBack: props => () => props.skipBackward(),
    onClickVideoForward: props => () => props.skipForward()
  })
);

export default enhance(({ onClickVideoBack, onClickVideoForward }) => (
  <Button.Group className="videx-playback-skip-container-button-group">
    <Button size={'tiny'} onClick={onClickVideoBack} compact={true}>
      <Icon name="undo" />
      <div>-5</div>
    </Button>
    <Button size={'tiny'} onClick={onClickVideoForward} compact={true}>
      <Icon name="repeat" />
      <div>+5</div>
    </Button>
  </Button.Group>
));
