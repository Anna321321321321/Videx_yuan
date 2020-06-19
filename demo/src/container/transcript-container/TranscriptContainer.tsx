import { List } from 'immutable';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { Button, Header } from 'semantic-ui-react';
import * as AnnotationSelectSectionStore from '../../stores/annotation-select-section-store';
import * as TranscriptStore from '../../stores/transcript-store';
import * as VideoPlayerStore from '../../stores/video-player-store';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as selectors from './selectors';
import * as ActiveVideoStore from '../../stores/active-video-store';
import TranscriptSegmentContainer from '../transcript-segment-container';

const actions = {
  controlAutoScroll: TranscriptStore.actions.controlAutoScroll,
  seekVideoPlayer: VideoPlayerStore.actions.seek,
  updateAnnotationSelectSection: AnnotationSelectSectionStore.actions.update,
  removeAnnotation: AnnotationsStore.actions.remove,
  addAnnotation: AnnotationsStore.actions.added
};

const mapStateToProps = state => ({
  autoScroll: TranscriptStore.selectors.getAutoScroll(state),
  toolPosition: selectors.getToolPosition(state),
  segmentsState: selectors.getSegmentsState(state),
  thumbnail: ActiveVideoStore.selectors.getThumbnail(state),
  transcripts: selectors.mergeTranscriptTimestamp(state),
  annotations: selectors.mergeTranscriptAnnotations(state)
});

const enhance = compose(
  connect(
    mapStateToProps,
    actions
  ),
  withState('contextMenuIndex', 'setContextMenuIndex', null),
  withState('popupMenuCoordinates', 'setPopupMenuCoordinates', null),
  withState('flexSize', 'setFlexSize', 0.2),
  withHandlers({
    onMouseDown: props => (index1, index2) => e => {
      if (e.ctrlKey) {
        e.stopPropagation();
        e.preventDefault();
        const start = props.transcripts
          .get(index1)
          .get('words')
          .get(index2)
          .getIn(['range', 'start']);
        const end = props.transcripts
          .get(index1)
          .get('words')
          .get(index2)
          .getIn(['range', 'end']);
        props.addAnnotation(
          AnnotationsStore.Annotation.create(null, null, start, end)
        );
      } else {
        //left click- seek for video
        if (e.button === 0) {
          e.stopPropagation();
          props.updateAnnotationSelectSection(
            props.transcripts
              .get(index1)
              .get('words')
              .get(index2)
              .getIn(['range', 'start']),
            'transcript',
            'start'
          );
        } else {
          e.stopPropagation();
        }
      }
    },
    onMouseMove: props => (index1, index2) => e => {
      e.stopPropagation();
      props.updateAnnotationSelectSection(
        props.transcripts
          .get(index1)
          .get('words')
          .get(index2)
          .getIn(['range', 'end']),
        'transcript',
        'inprogress'
      );
    },
    onMouseUp: props => (index1, index2) => e => {
      // check if its right click
      if (e.button !== 2) {
        props.setPopupMenuCoordinates({
          xCo: e.nativeEvent.layerX,
          yCo: e.nativeEvent.layerY,
          segmentIndex: index1
        });
        e.stopPropagation();
        props.updateAnnotationSelectSection(
          props.transcripts
            .get(index1)
            .get('words')
            .get(index2)
            .getIn(['range', 'end']),
          'transcript',
          'end'
        );
      }
    },
    createAnnotation: props => (start, end) => {
      // default add highlight for all annotations
      props.addAnnotation(
        AnnotationsStore.Annotation.create(null, '#fff110', start, end)
      );
    },
    contextMenuIndexHandler: props => index => {
      props.setContextMenuIndex(index);
    },
    onClick: props => timestamp => e => {
      e.stopPropagation();
      props.seekVideoPlayer(timestamp);
    },
    onWheel: props => () => {
      props.controlAutoScroll(false);
    },
    onClickAutoScroll: props => () => props.controlAutoScroll(true),
    onResize: props => flexSize => {
      props.setFlexSize(flexSize);
    }
  })
);

interface TranscriptContainerProps {
  transcripts: any;
  tags: any;
  toolPosition: number[];
  autoScroll: boolean;
  segmentsState: List<boolean>;
  onMouseDown: (index1: number, index2: number) => void;
  onMouseMove: (index1: number, index2: number) => void;
  onMouseUp: (index1: number, index2: number) => void;
  onClick: (timestamp: number) => void;
  onWheel: () => void;
  onClickAutoScroll: () => void;
  thumbnail: {
    url: string;
    sas: string;
    height: number;
    width: number;
  };
  annotations: any;
  removeAnnotation: (id) => void;
  createAnnotation: (start, end) => void;
  addAnnotation: (annotation: AnnotationsStore.Annotation) => void;
  contextMenuIndex: number;
  setContextMenuIndex: (segmentIndex: number) => void;
  contextMenuIndexHandler: (segmentIndex: number) => void;
  popupMenuCoordinates: any;
  setPopupMenuCoordinates: (value) => void;
  flexSize: number;
  setFlexSize: (flexSize) => void;
  onResize: (flexSize) => void;
}

export default enhance((props: TranscriptContainerProps) => {
  return (
    <div
      onWheel={props.onWheel}
      style={{
        margin: '1px',
        background: '#fff'
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: '-0.5px',
          zIndex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          padding: '10px'
        }}
      >
        <div style={{ flex: '1' }}>
          {!props.autoScroll && (
            <Button
              compact={true}
              primary={true}
              style={{
                position: 'sticky',
                top: '10px',
                zIndex: 1
              }}
              onClick={props.onClickAutoScroll}
              basic={true}
            >
              Enable Auto Scroll
            </Button>
          )}
        </div>
        <div
          style={{
            flex: '1'
          }}
        >
          <Header>Transcript</Header>
        </div>
      </div>
      {props.transcripts &&
        props.transcripts.map((transcript, index1: number) => (
          <TranscriptSegmentContainer
            key={index1}
            index1={index1}
            segmentsState={props.segmentsState}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            transcript={transcript}
            thumbnail={props.thumbnail}
            toolPosition={props.toolPosition}
            onClick={props.onClick}
            onMouseMove={props.onMouseMove}
            annotations={
              props.annotations !== null ? props.annotations.get(index1) : null
            }
            createAnnotation={props.createAnnotation}
            contextMenuIndexHandler={props.contextMenuIndexHandler}
            contextMenuIndex={props.contextMenuIndex}
            popupMenuCoordinates={props.popupMenuCoordinates}
            onResize={props.onResize}
            flexSize={props.flexSize}
          />
        ))}
    </div>
  );
});
