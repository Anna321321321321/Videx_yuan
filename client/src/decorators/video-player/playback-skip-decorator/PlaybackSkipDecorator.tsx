import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PlaybackSkipContainer from '../../../container/video-player-playback-skip-container';
import store from '../../../store';

// @ts-ignore
const Component = amp.getComponent('Component');

class PlaybackSkipDecorator extends Component {
  node: HTMLElement;

  constructor(player, options) {
    // @ts-ignore
    super(player, options);

    player.ready(() => {
      const controlBarChildren = player.controlBar.children();
      for (let i = 0; i < controlBarChildren.length; i += 1) {
        if (
          controlBarChildren[i].el() &&
          controlBarChildren[i].el().className === 'amp-controlbaricons-left'
        ) {
          const leftControlBar = player.controlBar.children()[i].el();
          this.node = document.createElement('div');
          this.node.className = 'videx-play-back-skip-decorator';
          ReactDOM.render(
            <Provider store={store}>
              <PlaybackSkipContainer />
            </Provider>,
            // @ts-ignore
            this.node
          );
          leftControlBar.appendChild(this.node);
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

Component.registerComponent('PlaybackSkipDecorator', PlaybackSkipDecorator);

export default PlaybackSkipDecorator;
