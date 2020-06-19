import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Experiment } from '../container';

export default class ExperimentPage extends Component {
  render() {
    return (
      <Index>
        <Layout
          style={{
            minHeight: '100vh'
          }}
        >
          <Header />
          <Experiment />
          <Footer />
        </Layout>
      </Index>
    );
  }
}
