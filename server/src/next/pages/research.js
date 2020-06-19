import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/research/components/Header';
import ResearchContent from '../components/research/components/ResearchContent';
import Footer from '../components/research/components/Footer';
import Cover from '../components/research/components/Cover';

export default class Research extends Component {
  render() {
    return (
      <Index>
        <Layout
          style={{
            minHeight: '100vh'
          }}
        >
          <Header />
          <Layout.Content style={{ paddingTop: '5vh' }}>
            <Cover />
            <ResearchContent />
          </Layout.Content>
          <Footer />
        </Layout>
      </Index>
    );
  }
}
