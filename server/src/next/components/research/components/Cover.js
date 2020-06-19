import React, { Component, Fragment } from 'react';
import { cover } from './styles';
import { Button } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

export default class Cover extends Component {
  render() {
    return (
      <section id="home">
        <style jsx>{cover}</style>
        <MediaQuery minWidth={768}>
          <div style={{ display: 'flex', backgroundColor: '#fff' }}>
            <div style={{ flex: 1, width: '40vw' }}>
              <div className="videoBox">
                <img
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  src="/static/cover2.png"
                />
              </div>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: '#00B7C3',
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="title">
                <h1 style={{ color: '#fff', marginBottom: '-10px' }}>ViDeX</h1>
                <h2 style={{ color: '#fff', fontWeight: 100 }}>
                  Bringing the textbook experience to video
                </h2>
                <Button
                  className="demo-button"
                  size="small"
                  compact={true}
                  style={{
                    borderRadius: 0,
                    width: '100px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  color="blue"
                  onClick={() => window.open('/demo')}
                >
                  Demo
                </Button>
              </div>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={300} maxWidth={767}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                flex: 1,
                backgroundColor: '#00B7C3',
                textAlign: 'center',
                justifyContent: 'center',
                height: '50vh'
              }}
            >
              <div className="title">
                <h1
                  style={{
                    color: '#fff',
                    marginBottom: '-10px',
                    paddingTop: '20px'
                  }}
                >
                  ViDeX
                </h1>
                <h2 style={{ color: '#fff', fontWeight: 100 }}>
                  Bringing the textbook experience to video
                </h2>
                <Button
                  className="demo-button"
                  size="small"
                  compact={true}
                  style={{
                    borderRadius: 0,
                    width: '100px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  color="blue"
                >
                  Demo
                </Button>
              </div>
            </div>
          </div>
        </MediaQuery>
        <span id="researchArea" />
      </section>
    );
  }
}
