import { Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import * as Logger from 'videx/client/logger';
import About from '../../components/about';
import OnlineFeedback from '../../components/online-feedback';

export default () => (
  <Menu
    borderless={true}
    size="small"
    style={{
      marginTop: '0px'
    }}
  >
    <Menu.Item>
      © {moment().format('YYYY')} University of British Columbia and Microsoft
      Corporation
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <OnlineFeedback />
      </Menu.Item>
      <Menu.Item>
        <a href="mailto:videx@ece.ubc.ca">Support</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => window.open('/terms')}>Terms of Use</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => window.open('/consent')}>Consent</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => window.open('/faq')}>FAQ</a>
      </Menu.Item>
      <Menu.Item>
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
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
