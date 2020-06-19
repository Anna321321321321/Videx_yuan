import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/header';
import Terms from '../components/terms';
import Footer from '../components/footer';

export default class terms extends Component {
  render() {
    return (
      <Index>
        <Layout
          style={{
            minHeight: '100vh'
          }}
        >
          <Header />
          <Layout.Content
            style={{
              padding: '0 5vw'
            }}
          >
            <Terms />
          </Layout.Content>
          <Footer />
        </Layout>
      </Index>
    );
  }
}
