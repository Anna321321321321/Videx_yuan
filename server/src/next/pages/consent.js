import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/header';
import Consent from '../components/consent';
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
            <Consent />
          </Layout.Content>
          <Footer />
        </Layout>
      </Index>
    );
  }
}
