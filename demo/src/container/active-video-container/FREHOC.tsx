import { connect } from 'react-redux';
import {
  compose,
  renderComponent,
  withHandlers,
  withProps,
  withState
} from 'recompose';
import * as VideoPlayerStore from '../../stores/video-player-store';

interface EnhancerHOCOutterProps {}

interface EnhancerHOCInnerProps {
  isFREEnabled: boolean;
  enableFRE: () => void;
  pauseFRE: () => void;
  disableFRE: () => void;
}

interface mapDispatchToPropsProps {
  play: () => void;
  pause: () => void;
}

interface withStateProps {
  isFREEnabled: boolean;
  controlFRE: (status: boolean) => void;
}

interface withHandlersProps {
  enableFRE: () => void;
  pauseFRE: () => void;
  disableFRE: () => void;
}

export default compose(
  connect(
    state => ({}),
    {
      play: VideoPlayerStore.actions.play,
      pause: VideoPlayerStore.actions.pause
    }
  ),
  withState('isFREEnabled', 'controlFRE', false),
  withHandlers({
    enableFRE: props => () => {
      props.pause();
      props.controlFRE(true);
    },
    pauseFRE: props => () => {
      props.controlFRE(false);
    },
    disableFRE: props => () => {
      props.play();
      props.controlFRE(false);
    }
  }),
  withProps(props => ({
    isFREEnabled: props.isFREEnabled,
    enableFRE: props.enableFRE,
    pauseFRE: props.pauseFRE,
    disableFRE: props.disableFRE
  }))
);
