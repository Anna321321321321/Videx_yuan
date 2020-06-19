import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { LinkContainer } from '../container';

export default class LinkPage extends Component {
  static async getInitialProps({ query }) {
    return { token: query.token };
  }

  render() {
    return (
      <Index>
        <Layout
          style={{
            minHeight: '100vh'
          }}
        >
          <Header />
          <LinkContainer token={this.props.token} />
          <Footer />
        </Layout>
      </Index>
    );
  }
}
