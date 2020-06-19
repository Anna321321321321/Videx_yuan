import { Avatar, Dropdown, Icon, Menu } from 'antd';
import React, { PureComponent } from 'react';
import * as Logger from 'videx/client/logger';
import './styles/index.scss';

export interface AvatarProps {
  name: string;
  onLogOut?: Function;
}

export default class Persona extends PureComponent<AvatarProps, any> {
  private menu = (
    <Menu
      style={{
        width: 200
      }}
    >
      <Menu.Item key="logout">
        <a
          href="/logout"
          onClick={() => {
            Logger.event('App.Logout.Click');
            if (typeof this.props.onLogOut === 'function') {
              this.props.onLogOut();
            }
          }}
          style={{
            color: 'inherit'
          }}
        >
          <Icon
            type="logout"
            style={{
              marginRight: '8px'
            }}
          />
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <span className="avatar-dropdown">
        <Dropdown
          overlay={this.menu}
          placement="bottomLeft"
          trigger={['click']}
        >
          <Avatar
            style={{
              backgroundColor: '#71afe5',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
            size="large"
          >
            {this.props.name}
          </Avatar>
        </Dropdown>
      </span>
    );
  }
}
