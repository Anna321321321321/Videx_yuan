import React, { Component, Fragment } from 'react';
import { Router, browserHistory } from 'react-router';
import * as Logger from 'videx/client/logger';

export default class Root extends Component<any, any> {
  componentDidCatch(error, info) {
    Logger.error(error);
  }

  render() {
    return (
      <Fragment>
        <Router history={browserHistory}>{this.props.routes()}</Router>
      </Fragment>
    );
  }
}
