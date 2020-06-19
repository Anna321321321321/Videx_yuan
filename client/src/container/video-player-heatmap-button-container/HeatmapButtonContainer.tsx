import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Icon, List } from 'semantic-ui-react';
import * as VideoPlayerStore from '../../stores/video-player-store';

const actions = {
  toggleGraph: VideoPlayerStore.actions.toggleGraph
};

const enhance = compose(
  connect(
    null,
    actions
  ),
  withHandlers({
    selectGraphMode: props => mode => {
      if (mode === 'personal') {
        document
          .getElementById('videx-video-heatmap-class')
          .classList.remove('vjs-selected');
        document
          .getElementById('videx-video-heatmap-personal')
          .classList.add('vjs-selected');
      } else {
        document
          .getElementById('videx-video-heatmap-personal')
          .classList.remove('vjs-selected');
        document
          .getElementById('videx-video-heatmap-class')
          .classList.add('vjs-selected');
      }
      props.toggleGraph(mode);
    },
    playButtonEnter: props => () => {
      document.getElementById('playHighlightDropdown').classList.add('show');
      document.getElementById('playHighlightButton').style.cssText =
        'background:rgba(48,56,62, 0.99) !important';
    },
    playButtonLeave: props => () => {
      document.getElementById('playHighlightDropdown').classList.remove('show');
      document.getElementById('playHighlightButton').style.cssText =
        'background:transparent none !important';
    }
  })
);

interface HeatmapButtonContainerProps {
  playButtonEnter: () => void;
  playButtonLeave: () => void;
  selectGraphMode: (mode) => void;
  toggleGraph: (mode) => void;
}

export default enhance((props: HeatmapButtonContainerProps) => (
  <div className="videx-play-highlight-dropdown">
    <div
      id="playHighlightDropdown"
      onMouseEnter={props.playButtonEnter}
      onMouseLeave={props.playButtonLeave}
      className="videx-play-highlight-dropdown-content"
    >
      <li className="amp-menu-header">View Heatmap</li>
      <List divided={true} horizontal={true}>
        <li
          id="videx-video-heatmap-personal"
          className="vjs-menu-item amp-menu-item videx-play-highlight-color-dropdown-item vjs-selected"
          onClick={() => props.selectGraphMode('personal')}
          style={{ color: '#ffc658' }}
        >
          Personal
        </li>
        <br />
        <li
          id="videx-video-heatmap-class"
          className="vjs-menu-item amp-menu-item videx-play-highlight-color-dropdown-item"
          onClick={() => props.selectGraphMode('class')}
          style={{ color: '#8884d8' }}
        >
          Class
        </li>
      </List>
    </div>
    <Button
      onMouseEnter={props.playButtonEnter}
      onMouseLeave={props.playButtonLeave}
      basic={true}
      className="videx-play-highlight-plugin-container"
      compact={true}
      id="playHighlightButton"
    >
      <Icon inverted={true} name="area graph" />
    </Button>
  </div>
));
