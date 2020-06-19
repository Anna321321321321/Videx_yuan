import React from 'react';
import { Link } from 'react-router';
import { Header, Menu } from 'semantic-ui-react';
import { Button } from 'antd';
import ExportContainer from '../../container/export-container';

interface ActiveVideoHeaderProps {
  lessonName: string;
  onClickFRE: () => void;
}

export default (props: ActiveVideoHeaderProps) => (
  <Menu
    borderless={true}
    size="small"
    style={{
      marginTop: '0px',
      marginBottom: '0px',
      height: '50px'
    }}
  >
    <Menu.Item>
      <Link className="videx-active-video-header-logo" to="/">
        <img
          className="videx-active-video-header-logo-img"
          alt="logo"
          src="/static/logo.png"
        />
        <span className="videx-active-video-header-logo-span">ViDeX</span>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Header>{props.lessonName}</Header>
    </Menu.Item>
    <Menu.Item>
      <Button className="videx-joyride-tour-button" onClick={props.onClickFRE}>
        Start Tour
      </Button>
    </Menu.Item>
    <Menu.Item>
      <ExportContainer />
    </Menu.Item>
  </Menu>
);
