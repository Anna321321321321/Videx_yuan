import immutable from 'immutable';
import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';
import { Switch } from 'antd';
import { CloseOutline, CheckOutline } from '@ant-design/icons';
import { connect } from 'react-redux';
import { compose, withHandlers, onlyUpdateForKeys, withState } from 'recompose';
import TranscriptAnnotationIcon from '../../components/transcript-annotation-icon';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as Logger from 'videx/client/logger';
import Annotation from '../../stores/annotations-store/Annotation';
import * as selectors from '../../stores/annotations-store/selectors';
import { mongo } from 'mongoose';
import { getAdminAccess } from 'src/stores/lesson-library-store/selectors';
import {
  ableSelectPrivate,
  disableSelectPrivate,
} from 'src/stores/annotations-store/actions';

interface TranscriptAnnotationsContainerProps {
  annotations: immutable.List<any>;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  index1: number;
  onMouseEnterAnnotation: (id) => void;
  onMouseLeaveAnnotation: () => void;
  annotation: {
    text: string;
    share: boolean;
    publicForShare: boolean;
    color: string;
    loading: boolean;
  };
  setAnnotation: (annotation) => void;
  handleClick: (annotation) => void;
  selectPrivate: boolean;
  update: (id, object) => void;
}

const actions = {
  onMouseEnterAnnotation: AnnotationsStore.actions.select,
  onMouseLeaveAnnotation: AnnotationsStore.actions.deselect,
  update: AnnotationsStore.actions.update,
};

const mapStateToProps = (state) => ({
  selectPrivate: selectors.selectPrivate(state),
});

const enhance = compose(
  connect(mapStateToProps, actions),

  withState('annotation', 'setAnnotation', null),
  withHandlers({
    onMouseEnter: (props) => (id: Annotation) => () => {
      const annotationObject = id.toObject();
      Logger.event('Annotation.Hover', {
        source: 'transcript',
        annotationId: annotationObject.id,
        annotationText: annotationObject.text,
        annotationColor: annotationObject.color,
        annotationStart: annotationObject.start,
        annotationEnd: annotationObject.end,
        annotationTranscript: annotationObject.transcript,
      });
      props.onMouseEnterAnnotation(id);
    },
    onMouseLeave: (props) => () => () => props.onMouseLeaveAnnotation(),
    handleClick: (props) => (annotation) => {
      if (props.annotation !== null) {
        props.setAnnotation(null);
      } else {
        props.setAnnotation(annotation);
      }
    },
  }),
  onlyUpdateForKeys(['annotations', 'selectPrivate'])
);

export default enhance((props: TranscriptAnnotationsContainerProps) => {
  return (
    <div className="videx-transcript-annotations-container">
      <List selection verticalAlign="middle">
        {props.annotations.map((annotation, index) => (
          <div>
            <TranscriptAnnotationIcon
              key={index}
              annotationMap={annotation}
              onMouseEnter={props.onMouseEnter(annotation.get('annotation'))}
              onMouseLeave={props.onMouseLeave()}
              handleClick={props.handleClick}
            />
            {props.selectPrivate && (
              <Switch
                onChange={(checked) => {
                  if (checked) {
                    props.update(annotation.get('annotation').id, {
                      publicForShare: false,
                    });
                  } else {
                    props.update(annotation.get('annotation').id, {
                      publicForShare: true,
                    });
                  }
                }}
                defaultChecked={
                  !annotation.get('annotation').toObject().publicForShare
                }
                checkedChildren="private"
                unCheckedChildren="public"
              />
            )}
          </div>
        ))}
      </List>
      <div style={{ position: 'relative' }} />
    </div>
  );
});
