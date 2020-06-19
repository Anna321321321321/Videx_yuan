import React, { Component } from 'react';

export default class Features extends Component {
  render() {
    return (
      <div>
        <h1>Textbook tools for video learning</h1>
        <div className="row white">
          <div className="col">
            <img src="/static/preview.png" alt="Preview content" />
          </div>
          <div className="col text left">
            <h2>Preview content</h2>
            <p>
              Skim content easily by reading the transcript or scanning the
              filmstrip
            </p>
          </div>
        </div>
        <div className="row white">
          <div className="col text right">
            <h2>Annotate sections</h2>
            <p>
              Keep track of important content by annotating sections of videos
            </p>
          </div>
          <div className="col">
            <img src="/static/fre/filmstrip.gif" alt="Annotate sections" />
            <img src="/static/fre/transcript.gif" alt="Annotate sections" />
          </div>
        </div>
        <div className="row white">
          <div className="col">
            <img src="/static/fre/export.gif" alt="Play highlights" />
          </div>
          <div className="col text left">
            <h2>Play and Export Annotations</h2>
            <p>
              Review important content easily by playing annotated sections. You
              can also export your annotations to a PDF or OneNote page.
            </p>
          </div>
        </div>
        <style jsx>{`
          .col {
            margin: 0 4em;
            text-align: center;
            max-width: 350px;
          }
          .text {
            display: flex;
            flex-direction: column;
          }
          .text.right {
            text-align: right;
          }
          .text.left {
            text-align: left;
          }
          .col img {
            max-width: 350px;
          }
          @media (max-width: 1280px) {
            .col {
              max-width: 100%;
            }
            .text.left {
              text-align: center;
            }
            .text.right {
              text-align: center;
            }
            .col img {
              width: 100%;
              margin: 0 1em;
            }
          }
        `}</style>
      </div>
    );
  }
}
