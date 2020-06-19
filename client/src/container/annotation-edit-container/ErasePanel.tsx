import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

export default class ErasePanel extends Component<any, any> {
  render() {
    return (
      <Icon
        name="trash"
        onClick={() => {
          this.props.delete(this.props.annotation.id);
          if (this.props.onClickHandle !== null) {
            this.props.onClickHandle();
          }
        }}
        size="large"
        className="videx-hover"
      />
    );
  }
}
