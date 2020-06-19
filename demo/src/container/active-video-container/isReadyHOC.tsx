import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { Dimmer, Loader } from 'semantic-ui-react';
import * as VideoPlayerStore from '../../stores/video-player-store';

export default compose(
  connect(
    state => ({
      isReady: VideoPlayerStore.selectors.isInitialized(state)
    }),
    {}
  ),
  withProps(props => ({
    isReady: props.isReady
  }))
);
