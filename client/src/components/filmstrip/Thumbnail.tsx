import React, { Component } from 'react';
import * as FilmstripCore from '../../core/filmstrip';
import { time2thumbnail } from '../../core/filmstrip/helpers';

interface ThumbnailProps {
  segment: {
    start: number;
    end: number;
  };
  filmstripSize: {
    rowsNumber: number;
    colsNumber: number;
    rowHeight: number;
    rowWidth: number;
  };
  videoDuration: number;
  thumbnail: {
    url: string;
    height: number;
    width: number;
    sas: string;
  };
  isActive?: boolean;
  isPositionOutside?: boolean;
  position?: {
    x: number;
    y: number;
  };
  contextMenuData: any;
}

export default class Thumbnail extends Component<ThumbnailProps, null> {
  generateThumbnails = () => {
    const {
      filmstripSize,
      segment,
      thumbnail,
      position,
      isPositionOutside
    } = this.props;
    // convert pixel to timestamp
    const cursorPositionTime: number = FilmstripCore.helpers.pixels2timestamp(
      position.x,
      segment,
      filmstripSize.rowWidth
    );

    // find how many thumbnail it will generate
    const thumbnailNumber: number = filmstripSize.colsNumber;

    let start: number = segment.start;
    const offset: number = (segment.end - segment.start) / thumbnailNumber;

    return [...Array(thumbnailNumber)].map((value, index) => {
      const time =
        !isPositionOutside &&
        cursorPositionTime >= start &&
        cursorPositionTime < start + offset
          ? cursorPositionTime
          : start + offset / 2.0;
      const link = time2thumbnail(time, thumbnail.url, thumbnail.sas);
      start += offset;
      return (
        <div
          key={index}
          style={{
            height: filmstripSize.rowHeight,
            width: filmstripSize.rowWidth / filmstripSize.colsNumber
          }}
        >
          <img key={index} className="videx-thumbnail-column" src={link} />
        </div>
      );
    });
  };

  /**
   * Renders the component.
   *
   * @return {ReactElement} - HTML markup for the component
   */
  render() {
    const { filmstripSize } = this.props;
    return (
      <div
        className="videx-thumbnail"
        style={{
          height: filmstripSize.rowHeight,
          width: filmstripSize.rowWidth
        }}
      >
        {this.generateThumbnails()}
      </div>
    );
  }
}
