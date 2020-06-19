import React, { Component } from 'react';
import _ from 'lodash';

interface AnnotationProgressBarProps {
  data: { name: string; count: number; value: number; color: string }[];
  onClick: (color: string) => void;
}

export default class AnnotationsProgressBar extends Component<
  AnnotationProgressBarProps
> {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, onClick } = this.props;

    const values =
      data &&
      data.length &&
      data.map((item, idx) => {
        if (item.value > 0) {
          return (
            <div
              className="value"
              style={{ color: item.color, width: item.value + '%' }}
              key={idx}
            >
              <span>{item.count}</span>
            </div>
          );
        }
      });

    const calibrations =
      data &&
      data.length &&
      data.map((item, idx) => {
        if (item.value > 0) {
          return (
            <div
              className="graduation"
              style={{ color: item.color, width: item.value + '%' }}
              key={idx}
            >
              <span>|</span>
            </div>
          );
        }
      });

    const bars =
      data &&
      data.length &&
      data.map((item, idx) => {
        if (item.value > 0) {
          return (
            <div
              onClick={() => onClick(item.name)}
              className="bar"
              style={{ backgroundColor: item.color, width: item.value + '%' }}
              key={idx}
            />
          );
        }
      });

    const legends =
      data &&
      data.length &&
      data.map((item, idx) => {
        if (item.value > 0) {
          return (
            <div className="legend" key={idx}>
              <span className="dot" style={{ color: item.color }}>
                ●
              </span>
              <span className="label">{item.name}</span>
            </div>
          );
        }
      });

    return (
      <div className="multicolor-bar">
        <div className="values">{values}</div>
        <div className="scale">{calibrations}</div>
        <div className="bars">{bars}</div>
        <div className="legends">{legends}</div>
      </div>
    );
  }
}
