import { Layout, Menu } from 'antd';
import { Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import { Link } from 'react-router';
import * as Logger from 'videx/client/logger';

const { SubMenu } = Menu;
const { Sider } = Layout;

export interface DashboardSiderProps {
  // courses: {
  //   name: string;
  //   id: string;
  // }[];
  // adminAccess: boolean;
}

export default class DashboardSider extends Component<
  DashboardSiderProps,
  any
> {
  render() {
    return (
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        width={200}
        style={{
          background: '#fff'
        }}
      >
        <Menu
          mode="inline"
          style={{
            height: '100%',
            borderRight: 0
          }}
          inlineIndent={12}
        >
          <Menu.Item key="overview">
            <Icon name="chart bar" />
            Overview
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
