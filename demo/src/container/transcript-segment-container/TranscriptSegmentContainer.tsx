import immutable from 'immutable';
import _ from 'lodash';
import React, { Fragment } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compose, onlyUpdateForKeys, withHandlers, withState } from 'recompose';
import { Icon, Segment } from 'semantic-ui-react';
import TranscriptTimestamp from '../../components/transcript-timestamp';
import TranscriptWord from '../../components/transcript-word';
import TranscriptWordHighlight from '../../components/transcript-word-highlight';
import TranscriptAnnotationPickerDecorator from '../../decorators/transcript-annotation-picker-decorator';
import TranscriptAnnotationsContainer from '../transcript-annotations-container';
import TranscriptContextMenu from '../transcript-context-menu';
import ThumbnailContainer from './ThumbnailContainer';

interface TranscriptSegmentContainerProps {
  annotations: any;
  index1: number;
  onMouseDown: (index1: number, index2: number) => void;
  onMouseMove: (index1: number, index2: number) => void;
  onMouseUp: (index1: number, index2: number) => void;
  onClick: (timestamp: number) => void;
  onWheel: () => void;
  onClickAutoScroll: () => void;
  setCoordinates: (x: number, y: number, data) => void;
  contextMenuData: {
    xCo: number;
    yCo: number;
    data: any;
  };
  setContextMenuData: (contextMenuData) => void;
  contextMenuIndexHandler: (contextMenuIndex: number) => void;
  contextMenuIndex: number;
  transcript: immutable.Map<any, any>;
  tags: any;
  toolPosition: number[];
  segmentsState: immutable.List<any>;
  thumbnail: {
    url: string;
    sas: string;
    height: number;
    width: number;
  };
  createAnnotation: (start, end) => void;
  createQuickAnnotation: () => void;
  popupMenuCoordinates: any;
  flexSize: number;
  onResize: (flexSize) => void;
  debounceDragAndResize: (flexSize) => void;
}

const enhance = compose(
  withState('showEdit', 'setShowEdit', false),
  withState('contextMenuData', 'setContextMenuData', null),
  withHandlers({
    setShowIcon: props => status => {
      props.setShowIcon(status);
    },
    setCoordinates: props => (x, y, data) => {
      props.setContextMenuData({ xCo: x, yCo: y, data: data });
      props.contextMenuIndexHandler(props.index1);
    },
    debounceDragAndResize: props => value => {
      props.onResize(value);
    }
  }),
  onlyUpdateForKeys([
    'transcript',
    'annotations',
    'showQuickAnnotationIcon',
    'toolPosition',
    'contextMenuData',
    'contextMenuIndex',
    'popupMenuCoordinates',
    'flexSize'
  ])
);

export default enhance((props: TranscriptSegmentContainerProps) => {
  return (
    <div
      style={{ display: 'flex' }}
      onMouseDown={_.debounce(() => props.contextMenuIndexHandler(null), 100)}
      className="videx-transcript-segment-div"
    >
      <Segment
        id={`transcript-${props.index1}`}
        className="videx-transcript-segment"
        key={props.index1}
        raised={props.segmentsState.get(props.index1)}
        basic={true}
        style={{ padding: '5px', position: 'relative', width: '85%' }}
      >
        <TranscriptTimestamp
          basic={!props.segmentsState.get(props.index1)}
          timestamp={props.transcript.getIn(['range', 'start'])}
          onClickLabel={props.onClick(
            props.transcript.getIn(['range', 'start'])
          )}
          key={props.index1}
        />
        <ReflexContainer orientation="vertical">
          <ReflexElement
            flex={props.flexSize}
            onResize={_.debounce(event => {
              props.debounceDragAndResize(event.component.props.flex);
            }, 500)}
            propagateDimensions={false}
          >
            <ThumbnailContainer
              transcript={props.transcript}
              thumbnail={props.thumbnail}
              index1={props.index1}
            />
          </ReflexElement>
          <ReflexSplitter
            propagate={true}
            id={`splitter-${props.index1}`}
            className="videx-thumbnail-splitter"
          />
          <ReflexElement style={{ overflow: 'visible' }}>
            <div style={{ position: 'relative' }}>
              {props.transcript.get('words').map((word, index2) => (
                <Fragment key={index2}>
                  {(word.get('background') === 'white' ||
                    word.get('background') === null) && (
                    <TranscriptWord
                      onMouseDown={props.onMouseDown(props.index1, index2)}
                      onMouseMove={props.onMouseMove(props.index1, index2)}
                      onMouseUp={props.onMouseUp(props.index1, index2)}
                      text={word.get('text')}
                      background={word.get('background')}
                      fontWeight={word.get('fontWeight')}
                      color={word.get('color')}
                    />
                  )}
                  {word.get('background') !== 'white' &&
                    word.get('background') !== null && (
                      <TranscriptWordHighlight
                        onMouseDown={props.onMouseDown(props.index1, index2)}
                        onMouseMove={props.onMouseMove(props.index1, index2)}
                        onMouseUp={props.onMouseUp(props.index1, index2)}
                        text={word.get('text')}
                        background={word.get('background')}
                        fontWeight={word.get('fontWeight')}
                        annotationData={word.get('annotationData')}
                        color={word.get('color')}
                        setCoordinates={props.setCoordinates}
                      />
                    )}
                </Fragment>
              ))}
              {props.contextMenuData !== null &&
                props.contextMenuIndex === props.index1 &&
                props.contextMenuData.data.metadata.editable && (
                  <TranscriptContextMenu
                    contextMenuData={props.contextMenuData}
                    origin="highlight"
                    onClickHandle={null}
                  />
                )}
              {props.toolPosition &&
                props.toolPosition[0] === props.index1 && (
                  <TranscriptAnnotationPickerDecorator
                    coordinates={props.popupMenuCoordinates}
                  />
                )}
            </div>
          </ReflexElement>
        </ReflexContainer>
      </Segment>
      <div style={{ clear: 'both', width: '15%' }}>
        {props.annotations !== null && (
          <TranscriptAnnotationsContainer
            key={props.index1 + 'a'}
            index1={props.index1}
            annotations={props.annotations}
          />
        )}
        <div
          style={{
            position: 'relative',
            marginTop: '25px',
            padding: 'none',
            display: 'block'
          }}
          className="videx-quick-annotation-tool videx-hover"
        >
          <Icon
            name="sticky note outline"
            size="large"
            onClick={() => {
              props.createAnnotation(
                props.transcript.getIn(['range', 'start']),
                props.transcript.getIn(['range', 'end'])
              );
            }}
          />
          <span style={{ position: 'absolute', top: -10, left: -5 }}>
            <Icon name="plus circle" />
          </span>
        </div>
      </div>
    </div>
  );
});
