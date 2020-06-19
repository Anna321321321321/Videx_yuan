import React, { Component } from 'react';
import Head from './components/Head';
import Features from './components/Features';
import Footer from './components/Footer';

export default class Landing extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          textAlign: 'center'
        }}
      >
        <Head />
        <Features />
        <Footer />
        <style jsx global>{`
          h1 {
            color: #1890ff;
            font-size: 32px;
            line-height: 48pt;
            margin: 0.5em 0em;
          }
          h2 {
            color: #1890ff;
            font-size: 24px;
            line-height: 36px;
            margin: 0.5em 0em;
          }
          p {
            font-size: 14px;
            line-height: 21px;
            margin: 0.5em 0em;
          }
          @media (min-width: 1280px) {
            .row {
              align-items: center;
              display: flex;
              background: #fafbfd;
              flex-direction: column;
              justify-content: center;
              padding: 3em 20em 3em 20em;
            }
            .row.white {
              flex-direction: row;
              background: #fff;
            }
          }
          @media (max-width: 1280px) {
            .row {
              background: #fafbfd;
              padding: 2em 1em;
            }
            .row.white {
              background: #fff;
            }
          }
        `}</style>
      </div>
    );
  }
}
