import { Layout, Progress } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';
import APICaller from '../../system/api-caller';
import './style/index.scss';

export default class IdConsentPage extends Component<any, any> {
  componentWillMount() {
    APICaller.post(`/api/v4/consent/register`, {}, () => {});
  }
  render() {
    return (
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <Header />

        <div
          style={{
            textAlign: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: '50px',
            height: '80vh'
          }}
        >
          <h1>Success!</h1>
          <Progress
            type="circle"
            percent={100}
            format={() => 'Done'}
            style={{ paddingBottom: '20px' }}
          />
          <p>
            Your credentials has been shared with the ViDeX research team. You
            can now close this window.
          </p>
        </div>
        <Footer />
      </Layout>
    );
  }
}
