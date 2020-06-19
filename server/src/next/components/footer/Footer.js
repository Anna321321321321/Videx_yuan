import { Layout } from 'antd';
import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <Layout.Footer
        style={{
          transition: 'opacity 0.5s',
          background: '#fff',
          marginTop: '24px'
        }}
      >
        <div>
          © 2018 University of British Columbia and Microsoft Corporation
        </div>
        <div>
          <a href="mailto:videx@ece.ubc.ca">Support</a>
        </div>
        <div>
          <a href="/consent">Consent Form</a>
        </div>
        <div>
          <a href="/terms">Terms of Use</a>
        </div>
        <div>
          <a href="/faq">FAQ</a>
        </div>
      </Layout.Footer>
    );
  }
}
