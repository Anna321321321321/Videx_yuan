import immutable from 'immutable';
import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, withHandlers, onlyUpdateForKeys, withState } from 'recompose';
import TranscriptAnnotationIcon from '../../components/transcript-annotation-icon';
import * as AnnotationsStore from '../../stores/annotations-store';
import Annotation from '../../stores/annotations-store/Annotation';

const actions = {
  onMouseEnterAnnotation: AnnotationsStore.actions.select,
  onMouseLeaveAnnotation: AnnotationsStore.actions.deselect
};

const enhance = compose(
  connect(
    null,
    actions
  ),
  withState('annotation', 'setAnnotation', null),
  withHandlers({
    onMouseEnter: props => (id: Annotation) => () => {
      const annotationObject = id.toObject();
      props.onMouseEnterAnnotation(id);
    },
    onMouseLeave: props => () => () => props.onMouseLeaveAnnotation(),
    handleClick: props => annotation => {
      if (props.annotation !== null) {
        props.setAnnotation(null);
      } else {
        props.setAnnotation(annotation);
      }
    }
  }),
  onlyUpdateForKeys(['annotations'])
);

interface TranscriptAnnotationsContainerProps {
  annotations: immutable.List<any>;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  index1: number;
  onMouseEnterAnnotation: (id) => void;
  onMouseLeaveAnnotation: () => void;
  annotation: any;
  setAnnotation: (annotation) => void;
  handleClick: (annotation) => void;
}

export default enhance((props: TranscriptAnnotationsContainerProps) => {
  return (
    <div className="videx-transcript-annotations-container">
      <List selection verticalAlign="middle">
        {props.annotations.map((annotation, index) => (
          <TranscriptAnnotationIcon
            key={index}
            annotationMap={annotation}
            onMouseEnter={props.onMouseEnter(annotation.get('annotation'))}
            onMouseLeave={props.onMouseLeave()}
            handleClick={props.handleClick}
          />
        ))}
      </List>
      <div style={{ position: 'relative' }} />
    </div>
  );
});
