import React, { Component } from 'react';
import LandingPageButtons from '../../landing-page-buttons';

export default class Footer extends Component {
  render() {
    return (
      <div className="row">
        <h1>Invited to a ViDeX course?</h1>
        <p style={{ fontSize: '14px' }}>
          You can create a profile by signing in with your Microsoft account and
          register for a course using the course registration token. ViDeX can
          only be accessed by students using a course registration token. If you
          do not have a registration token, please ask your instructor to
          provide you with one.
        </p>
        <LandingPageButtons />
      </div>
    );
  }
}
