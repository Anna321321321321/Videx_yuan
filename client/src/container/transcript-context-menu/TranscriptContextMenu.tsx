import React, { Component } from 'react';
import AnnotationEditContainer from '../annotation-edit-container';

export default class TranscriptContextMenu extends Component<any, any> {
  render() {
    const { xCo, yCo, data } = this.props.contextMenuData;
    const widthStyle = data.metadata.editable ? '250px' : '80px';

    return (
      <div
        className="videx-context-menu"
        style={
          this.props.origin === 'icon'
            ? { right: '0px', top: yCo, width: widthStyle }
            : { left: xCo, top: yCo, width: widthStyle }
        }
      >
        <AnnotationEditContainer
          id={data.id}
          origin={this.props.origin}
          onClickHandle={this.props.onClickHandle}
        />
      </div>
    );
  }
}
