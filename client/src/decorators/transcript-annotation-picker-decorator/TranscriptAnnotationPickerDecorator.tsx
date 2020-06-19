import React, { Component } from 'react';
import AnnotationPickerContainer from '../../container/annotation-picker-container';

export default class TranscriptAnnotationPickerDecorator extends Component<
  any,
  any
> {
  render() {
    const contentMenuStyle = {
      left:
        this.props.coordinates.xCo < 400
          ? this.props.coordinates.xCo - 150
          : this.props.coordinates.xCo,
      top: this.props.coordinates.yCo
    };
    return (
      <div
        style={contentMenuStyle}
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        className="videx-transcript-annotation-picker-decorator"
      >
        <AnnotationPickerContainer />
      </div>
    );
  }
}
