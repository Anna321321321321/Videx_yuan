import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import HeatmapButtonContainer from '../../../container/video-player-heatmap-button-container';

// @ts-ignore
const Component = amp.getComponent('Component');

class VideoPlayerHeatmapControlDecorator extends Component {
  node: HTMLElement;
  constructor(player, options) {
    super(player, options);

    player.ready(() => {
      const controlBarChildren = player.controlBar.children();
      for (let i = 0; i < controlBarChildren.length; i += 1) {
        if (
          controlBarChildren[i].el() &&
          controlBarChildren[i].el().className === 'amp-controlbaricons-right'
        ) {
          const rightControlBar = player.controlBar.children()[i].el();
          this.node = document.createElement('div');
          this.node.className = 'videx-video-heatmap-control-button';
          ReactDOM.render(
            <Provider store={store}>
              <HeatmapButtonContainer />
            </Provider>,
            // @ts-ignore
            this.node
          );
          rightControlBar.insertBefore(
            this.node,
            rightControlBar.childNodes[0]
          );
        }
      }
    });
    // we need to unmount the component
    player.on('dispose', () => {
      // @ts-ignore
      ReactDOM.unmountComponentAtNode(this.node);
    });
  }
}

Component.registerComponent(
  'VideoPlayerHeatmapControlDecorator',
  VideoPlayerHeatmapControlDecorator
);

export default VideoPlayerHeatmapControlDecorator;
