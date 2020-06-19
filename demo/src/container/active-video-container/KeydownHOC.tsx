import keydown from 'react-keydown';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import * as VideoPlayerStore from '../../stores/video-player-store';

interface EnhancerHOCOutterProps {
  isReady: boolean;
}

interface EnhancerHOCInnerProps {}

interface keydownProps {
  keydown: {
    event: {
      code: string;
      preventDefault: () => void;
    };
  };
}

export default compose(
  connect(
    state => ({}),
    {
      togglePlayPause: VideoPlayerStore.actions.togglePlayPause,
      skipForward: VideoPlayerStore.actions.skipForward,
      skipBackward: VideoPlayerStore.actions.skipBackward
    }
  ),
  keydown('space', 37, 39),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.isReady && nextProps.keydown && nextProps.keydown.event) {
        switch (nextProps.keydown.event.code) {
          case 'Space':
            //non-firefox
            if (!(navigator.userAgent.indexOf('Firefox') > -1)) {
              this.props.togglePlayPause();
              nextProps.keydown.event.preventDefault();
            }
            break;
          case 'ArrowRight':
            this.props.skipForward();
            nextProps.keydown.event.preventDefault();
            break;
          case 'ArrowLeft':
            this.props.skipBackward();
            nextProps.keydown.event.preventDefault();
            break;
        }
      }
    }
  })
);
