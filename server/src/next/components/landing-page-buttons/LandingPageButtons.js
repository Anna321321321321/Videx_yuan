import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import GettingStarted from '../getting-startted';

const style = {
  margin: '0.25em'
};

export default class LandingPageButtons extends Component {
  render() {
    return (
      <div className="buttons">
        <div>
          <Popover
            content={<GettingStarted />}
            title="Getting Started with ViDeX"
            trigger="click"
          >
            <Button style={style}>Getting Started</Button>
          </Popover>
        </div>
        <div>
          <Button style={style} onClick={() => window.open('/research')}>
            ViDeX Research
          </Button>
        </div>
        <div>
          <Button style={style} onClick={() => window.open('/demo')}>
            Demo
          </Button>
        </div>
        <div>
          <Button style={style} onClick={() => window.open('/faq')}>
            FAQ
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            style={style}
            onClick={() => {
              location.href = '/auth/oauth2/login';
            }}
          >
            Log In with Microsoft Account
          </Button>
        </div>
        <style jsx>{`
          .buttons {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            margin: 0.5em 0em;
          }
        `}</style>
      </div>
    );
  }
}
