import { Layout, Menu, Button, Icon } from 'antd';
import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';

export default class Header extends Component {
  state = {
    collapsed: false
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout.Header
        style={{
          transition: 'opacity 0.5s',
          background: '#fff',
          marginBottom: '24px',
          padding: '0 48px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'fixed',
          zIndex: 99
        }}
        breakpoint={'lg'}
      >
        <img
          alt="logo"
          src="/static/logo.png"
          style={{
            height: '31px',
            lineHeight: '31px',
            marginRight: '8px'
          }}
        />
        <MediaQuery minWidth={350}>
          <span
            style={{
              fontSize: '16px',
              fontFamily: "'Raleway', 'Hiragino Sans GB', sans-serif",
              textTransform: 'uppercase'
            }}
          >
            ViDeX Research
          </span>
        </MediaQuery>

        <MediaQuery minWidth={767}>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: '40px', marginLeft: 'auto' }}
            onClick={item => (window.location.href = item.key)}
          >
            <Menu.Item key="#home">
              <Icon type="home" />Home
            </Menu.Item>
            <Menu.Item key="#researchArea">
              {' '}
              <Icon type="pie-chart" />Research areas
            </Menu.Item>
            <Menu.Item key="#publications">
              {' '}
              <Icon type="file-pdf" />Publications
            </Menu.Item>
            <Menu.Item key="#people">
              {' '}
              <Icon type="team" />People
            </Menu.Item>
            <Menu.Item key="#collaborate">
              {' '}
              <Icon type="phone" />Collaborate
            </Menu.Item>
          </Menu>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <Button
              onClick={this.toggleCollapsed}
              style={{ marginBottom: 16, marginLeft: 'auto' }}
            >
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            {this.state.collapsed && (
              <Menu
                theme="light"
                mode="inline"
                onClick={item => (window.location.href = item.key)}
                inlineCollapsed={!this.state.collapsed}
                style={{
                  width: 170,
                  position: 'absolute',
                  top: '50px',
                  right: '-30px'
                }}
              >
                <Menu.Item key="#home">
                  {' '}
                  <Icon type="home" />
                  <span>Home</span>
                </Menu.Item>
                <Menu.Item key="#researchArea">
                  {' '}
                  <Icon type="pie-chart" />
                  <span>Research areas</span>
                </Menu.Item>
                <Menu.Item key="#publications">
                  {' '}
                  <Icon type="file-pdf" />
                  <span>Publications</span>
                </Menu.Item>
                <Menu.Item key="#people">
                  {' '}
                  <Icon type="team" />
                  <span>People</span>
                </Menu.Item>
                <Menu.Item key="#collaborate">
                  <Icon type="phone" />
                  <span>Collaborate</span>
                </Menu.Item>
              </Menu>
            )}
          </div>
        </MediaQuery>
      </Layout.Header>
    );
  }
}
