import Areas from './Areas';
import Publications from './Publications';
import AuthorContainer from './AuthorContainer';
import AlummiContainer from './AlumniContainer';
import React, { Component } from 'react';
import Collaborate from './Collaborate';

export default class ResearchContent extends Component {
  render() {
    return (
      <div
        style={{
          background: '#e4e4e4',
          minHeight: 280,
          paddingTop: '10vh'
        }}
      >
        <section
          style={{
            height: '100%',
            paddingBottom: '5%'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              margin: 'auto',
              width: '80%'
            }}
          >
            <h1
              style={{
                fontSize: 'xx-large',
                fontSize: '100',
                fontWeight: '100'
              }}
            >
              Research areas
            </h1>
            <Areas />
          </div>
        </section>
        <section
          style={{
            height: '100%',
            backgroundColor: '#fff',
            paddingTop: '5vh'
          }}
          id="publications"
        >
          <div
            style={{
              margin: 'auto',
              width: '75vw'
            }}
          >
            <h1
              style={{
                color: '#3b6caa',
                paddingTop: '5vh',
                fontSize: 'xx-large',
                paddingBottom: '5vh',
                textAlign: 'center',
                fontWeight: '100'
              }}
            >
              Publications
            </h1>
            <Publications />
          </div>
        </section>
        <section
          style={{
            height: '100%',
            backgroundColor: '#212121',
            paddingTop: '5vh',
            paddingBottom: '10vh'
          }}
          id="people"
        >
          <div
            style={{
              textAlign: 'center',
              margin: 'auto',
              width: '80vw'
            }}
          >
            <h1
              style={{
                color: '#fff',
                paddingTop: '5vh',
                fontSize: 'xx-large',
                paddingBottom: '5vh',
                textAlign: 'center',
                fontWeight: '100'
              }}
            >
              People
            </h1>
            <AuthorContainer />
          </div>
          <div
            style={{
              textAlign: 'center',
              margin: 'auto',
              width: '80vw'
            }}
          >
            <h1
              style={{
                color: '#fff',
                paddingTop: '5vh',
                fontSize: 'xx-large',
                paddingBottom: '5vh',
                textAlign: 'center',
                fontWeight: '100'
              }}
            >
              Alumni
            </h1>
            <AlummiContainer />
          </div>
        </section>
        <Collaborate />
      </div>
    );
  }
}
