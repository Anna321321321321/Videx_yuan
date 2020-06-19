import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import FilmstripContainer from '../../../container/filmstrip-container';
// @ts-ignore
const Component = amp.getComponent('Component');

class FilmstripDisplayDecorator extends Component {
  node: HTMLElement;

  constructor(player, options) {
    // @ts-ignore
    super(player, options);

    player.ready(() => {
      ReactDOM.render(
        <Provider store={store}>
          <FilmstripContainer />
        </Provider>,
        // @ts-ignore
        this.el()
      );
    });
    // we need to unmount the component
    player.on('dispose', () => {
      // @ts-ignore
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }
}

Component.registerComponent(
  'FilmstripDisplayDecorator',
  FilmstripDisplayDecorator
);

export default FilmstripDisplayDecorator;
