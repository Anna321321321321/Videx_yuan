import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import * as ActiveVideoStore from '../../stores/active-video-store';

export default compose(
  connect(
    state => ({
      playlistName: ActiveVideoStore.selectors.getCategory(state),
      playlists: ActiveVideoStore.selectors.getPlaylists(state)
    }),
    {}
  ),
  withProps(props => ({
    playlistName: props.playlistName,
    playlists: props.playlists
  }))
);
