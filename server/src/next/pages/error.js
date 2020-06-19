import React, { Component } from 'react';
import Error from 'next/error';

const isNaN = value => /^\d+$/.test(value);

export default class error extends Component {
  static getInitialProps({ req }) {
    const { code } = req.query;
    if (
      isNaN(code) &&
      (parseInt(code, 10) >= 300 && parseInt(code, 10) < 600)
    ) {
      return { code: parseInt(code, 10) };
    } else {
      return { code: 400 };
    }
  }

  render() {
    return <Error statusCode={this.props.code} />;
  }
}
