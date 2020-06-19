import { Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

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
        <a href="mailto:videx@ece.ubc.ca">Support</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/terms">Terms of Use</a>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
