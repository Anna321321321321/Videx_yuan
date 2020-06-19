import React, { Component, Fragment } from 'react';
import { time2thumbnail } from '../../core/filmstrip/helpers';

interface ThumbnailProps {
  segment: {
    start: number;
    end: number;
  };
  thumbnail: {
    url: string;
    sas: string;
    width: number;
    height: number;
  };
}

export default class Thumbnail extends Component<ThumbnailProps, any> {
  generateThumbnails = () => {
    const { segment, thumbnail } = this.props;
    const time = (segment.start + segment.end) / 2;
    const link = time2thumbnail(time, thumbnail.url, thumbnail.sas);
    return <img className="videx-thumbnail-column-transcript" src={link} />;
  };

  render() {
    return (
      <Fragment>
        <div className="videx-thumbnail-transcript">
          {this.generateThumbnails()}
        </div>
      </Fragment>
    );
  }
}
