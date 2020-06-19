import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';

interface CursorPositionProps {
  style?: object;
  className?: string;
}

export default class CursorPosition extends Component<
  CursorPositionProps,
  any
> {
  render() {
    return (
      <ReactCursorPosition
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </ReactCursorPosition>
    );
  }
}
