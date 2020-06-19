import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as Logger from 'videx/client/logger';

export default class HighlightPanel extends Component<any, any> {
  submitHighlight = color => {
    Logger.event('Annotation.Highlight.Select');
    this.props.addAnnotation(
      AnnotationsStore.Annotation.create(
        null,
        color,
        this.props.annotationSelectSection.start,
        this.props.annotationSelectSection.end
      )
    );
    this.props.closeAnnotationPicker();
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
            onClick={() => this.submitHighlight(color)}
          />
        ))}
      </Fragment>
    );
  }
}
