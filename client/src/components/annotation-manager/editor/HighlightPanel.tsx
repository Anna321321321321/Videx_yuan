import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';

export default class HighlightPanel extends Component<any, any> {
  updateHighlight = color => {
    const { id } = this.props.annotation;
    this.props.updateAnnotation(id, {
      color: color
    });
  };

  private ArrayColor: string[] = ['#fff110', '#28a3dc', '#4cba35', '#e32990'];

  render() {
    return (
      <Fragment>
        {this.ArrayColor.map((color, index) => (
          <Icon
            key={index}
            name="circle"
            className="videx-hover"
            size="large"
            style={{ color: color === null ? 'grey' : color }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.updateHighlight(color);
            }}
          />
        ))}
        <Icon
          name="circle outline"
          className="videx-hover"
          style={{ color: 'white' }}
          size="large"
          onClick={e => {
            e.stopPropagation();
            this.updateHighlight(null);
          }}
        />
      </Fragment>
    );
  }
}
