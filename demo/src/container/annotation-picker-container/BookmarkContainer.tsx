import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import * as AnnotationsStore from '../../stores/annotations-store';

export default class BookmarkContainer extends Component<any, any> {
  render() {
    return (
      <span
        style={{ position: 'relative', marginTop: '25px', padding: 'none' }}
      >
        <Icon
          name="sticky note outline"
          size="large"
          className="videx-hover"
          onClick={() => {
            this.props.addAnnotation(
              AnnotationsStore.Annotation.create(
                null,
                null,
                this.props.annotationSelectSection.start,
                this.props.annotationSelectSection.end
              )
            );
            this.props.closeAnnotationPicker();
          }}
          style={{ color: 'grey' }}
        />
        <span
          style={{ position: 'absolute', top: -10, left: -5, color: 'grey' }}
        >
          <Icon name="plus circle" />
        </span>
      </span>
    );
  }
}
