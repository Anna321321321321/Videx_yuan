import React from 'react';
import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';
import { Button, Icon } from 'semantic-ui-react';
import * as VideoPlayerStore from '../../stores/video-player-store';
import * as selectors from './selectors';
import { message } from 'antd';

interface PlayAnnotationsPluginContainer {
  annotations: any;
  mode: {
    status: 'normal' | 'annotations' | 'interval';
    properties: {
      color: string;
    };
  };
  play: (color: string) => void;
  stop: () => void;
}

const mapStateToProps = state => ({
  mode: VideoPlayerStore.selectors.getMode(state),
  annotations: selectors.getAnnotations(state)
});

const mapDispatchToProps = {
  play: VideoPlayerStore.actions.playAnnotations
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  onlyUpdateForKeys(['annotations', 'mode'])
);

const playButtonEnter = () => {
  document.getElementById('videx-play-annotation-menu').classList.add('show');
  document.getElementById('videx-play-annotation-button').style.cssText =
    'background:rgba(48,56,62, 0.99) !important';
};

const playButtonLeave = () => {
  document
    .getElementById('videx-play-annotation-menu')
    .classList.remove('show');
  document.getElementById('videx-play-annotation-button').style.cssText =
    'background:transparent none !important';
};

export default enhance((props: PlayAnnotationsPluginContainer) => {
  return (
    <div className="videx-play-annotation-dropdown">
      <div
        className="videx-play-annotation-dropdown-content"
        id="videx-play-annotation-menu"
      >
        <li className="amp-menu-header">Play Annotations</li>
      </div>
      <Button
        onMouseEnter={playButtonEnter}
        onMouseLeave={playButtonLeave}
        basic={true}
        className="videx-play-annotation-plugin-container"
        compact={true}
        id="videx-play-annotation-button"
        onClick={() => {
          message.info('Playing Annotation', 3);
          props.play(props.annotations);
        }}
      >
        <Icon
          name="lightning"
          color={props.mode.status === 'annotations' ? 'blue' : null}
        />
      </Button>
    </div>
  );
});
