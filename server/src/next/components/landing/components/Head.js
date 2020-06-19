import React, { Component } from 'react';

export default class Head extends Component {
  render() {
    return (
      <div className="row">
        <h1>The smarter way to learn with videos</h1>
        <p>
          ViDeX brings traditional textbook tools to video learning. This is in
          closed preview with invited students at the University of British
          Columbia.
        </p>
        <img src="/static/web.png" alt="Screenshot" />
        <style jsx>{`
          img {
            width: 100%;
            margin: 2em 0em;
          }
        `}</style>
      </div>
    );
  }
}
