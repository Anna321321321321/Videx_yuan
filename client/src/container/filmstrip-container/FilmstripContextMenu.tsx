import React, { Component } from 'react';

export default class FilmtripContextMenu extends Component<any, any> {
  render() {
    const { xCoordinate, yCoordinate } = this.props.contextMenuData;
    return (
      <div
        className="videx-context-menu"
        style={{ left: xCoordinate, top: yCoordinate }}
      >
        <div>show icon</div>
      </div>
    );
  }
}
