import { Icon, Layout, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import * as Logger from 'videx/client/logger';
import About from '../../components/about';
import OnlineFeedback from '../../components/online-feedback';

export default () => (
  <Layout.Footer
    style={{
      transition: 'opacity 0.5s',
      background: '#fff',
      marginTop: '24px'
    }}
  >
    <span>
      © {moment().format('YYYY')} University of British Columbia and Microsoft
      Corporation
    </span>
    <span className="videx-home-footer">
      <span>
        <OnlineFeedback />
      </span>
      <span>
        <a href="mailto:videx@ece.ubc.ca">Support</a>
      </span>
      <span>
        <a href="/terms">Terms of Use</a>
      </span>
      <span>
        <a href="/consent">Consent</a>
      </span>
      <span>
        <a href="/faq">FAQ</a>
      </span>
      <span>
        <a
          onClick={() => {
            Logger.event('Footer.About.Click');
            Modal.info({
              title: 'About ViDeX',
              content: <About />,
              okText: 'Close'
            });
          }}
        >
          About
        </a>
      </span>
    </span>
  </Layout.Footer>
);
