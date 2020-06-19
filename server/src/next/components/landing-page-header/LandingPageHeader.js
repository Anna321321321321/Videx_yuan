import { Layout } from 'antd';
import React, { Component } from 'react';
import LandingPageButtons from '../landing-page-buttons';

export default class Header extends Component {
  render() {
    return (
      <Layout.Header
        className="header"
        style={{
          transition: 'opacity 0.5s',
          background: '#fff',
          marginBottom: '24px',
          padding: '0 24px',
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
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
          <span
            style={{
              fontSize: '16px',
              fontFamily: "'Raleway', 'Hiragino Sans GB', sans-serif",
              textTransform: 'uppercase'
            }}
          >
            ViDeX
          </span>
        </div>
        <LandingPageButtons />
        <style jsx global>{`
          @media (min-width: 640px) {
            .header {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }
          @media (max-width: 640px) {
            .header {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              height: 250px;
            }
          }
        `}</style>
      </Layout.Header>
    );
  }
}
