// Vendors
import './vendors';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ActiveVideoPage from './pages/active-video-page';
import store from './store';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <ActiveVideoPage />
        </Provider>
      </LocaleProvider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render();
