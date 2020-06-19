// Vendors
import './vendors';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import React from 'react';
import ReactDOM from 'react-dom'; //indicates using es6(not es 5)
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import init from './init';
import Root from './root';
import routes from './routes';
import store from './store';

init();

const render = routes => {
  ReactDOM.render(
    <AppContainer>
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <Root routes={routes} />
        </Provider>
      </LocaleProvider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(routes);

if (module.hot) { //hot module replacement api
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default;
    render(nextRoutes);
  });
}
