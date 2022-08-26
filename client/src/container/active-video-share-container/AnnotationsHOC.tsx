import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as VideoPlayerStore from '../../stores/video-player-store';

export default compose(
  connect(
    (state) => ({
      annotations: AnnotationsStore.selectors.getAnnotations(state),
      thumbnail: ActiveVideoStore.selectors.getThumbnail(state),
    }),
    {
      pause: VideoPlayerStore.actions.pause,
    }
  ),
  withHandlers({
    pauseVideo: (props) => () => {
      props.pause();
    },
  }),
  withProps((props) => ({
    annotations: props.annotations,
    thumbnail: props.thumbnail,
    pauseVideo: props.pauseVideo,
  }))
);
