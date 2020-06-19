import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import LandingPageHeader from '../components/landing-page-header';
import Landing from '../components/landing';
import Footer from '../components/footer';

export default class login extends Component {
  render() {
    return (
      <Index>
        <Layout>
          <LandingPageHeader />
          <Layout.Content
            style={{
              background: '#fff'
            }}
          >
            <Landing />
          </Layout.Content>
          <Footer />
        </Layout>
      </Index>
    );
  }
}
