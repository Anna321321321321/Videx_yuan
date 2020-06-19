import React, { Component } from 'react';

export default class GettingStarted extends Component {
  render() {
    return (
      <div>
        <p>
          You can sign in to ViDeX using a Microsoft account. Signing in will
          create your unique ViDeX profile. If you are a student who has been
          invited to ViDeX, please click{' '}
          <a href="/auth/oauth2/login">
            <span>here</span>
          </a>{' '}
          . After logging in you can register for your course using the token
          given by your instructor.
        </p>
        <br />
        <p>
          If you do not have a Microsoft account, you can create one
          <a href="https://account.microsoft.com/account">
            <span> here</span>
          </a>
          , or you can create a free Microsoft365 account through UBC IT
          <a href="https://it.ubc.ca/services/desktop-print-services/software-licensing/office-365-students/install">
            <span> here</span>
          </a>
          .
        </p>
        <br />
        <p>
          Notes: To use ViDeX, it's not necessary to download and install any
          Microsoft application.
        </p>
        <br />
        <p>
          <a href="mailto:videx@ece.ubc.ca?Subject=Help:%20Getting%20Office365%20Account">
            Need Help?
          </a>
        </p>
        <style jsx>{`
          p {
            font-size: 12px;
            line-height: 18px;
            margin: 0em;
          }
        `}</style>
      </div>
    );
  }
}
