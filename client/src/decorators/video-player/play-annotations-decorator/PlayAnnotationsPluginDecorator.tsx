import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import PlayAnnotationsPluginContainer from '../../../container/play-annotations-plugin-container';

// @ts-ignore
const Component = amp.getComponent('Component');

class PlayAnnotationsPluginDecorator extends Component {
  node: HTMLElement;

  constructor(player, options) {
    // @ts-ignore
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
          this.node.className = 'videx-play-annotations-plugin-decorator';
          ReactDOM.render(
            <Provider store={store}>
              <PlayAnnotationsPluginContainer />
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
  'PlayAnnotationsPluginDecorator',
  PlayAnnotationsPluginDecorator
);

export default PlayAnnotationsPluginDecorator;
