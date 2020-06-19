import React, { Fragment } from 'react';
import Measure from 'react-measure';
import { connect } from 'react-redux';
import { AnnotationPickerWrapper } from '../../components/filmstrip';
import { HeatMap, HighlightOverlay } from '../../components/filmstrip';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as AnnotationSelectSectionStore from '../../stores/annotation-select-section-store';
import * as AnnotationStore from '../../stores/annotations-store';
import * as Filmstrip from '../../stores/filmstrip';
import * as VideoPlayerStore from '../../stores/video-player-store';
import FilmstripSegment from './FilmstripSegment';
import * as selectors from './selectors';
import './style/index.scss';
import {
  compose,
  lifecycle,
  onlyUpdateForKeys,
  withHandlers,
  withState
} from 'recompose';
import _ from 'lodash';

interface FilmstripContainerProps {
  filmstripSize: {
    rowsNumber: number;
    colsNumber: number;
    rowHeight: number;
    rowWidth: number;
  };
  videoTimestampIndicators: number[];
  videoTimeMarkIndicators: {
    x: number;
    y: number;
    content: string;
  }[][];
  aggregatedViewsOverlay: {
    max: number;
    data: {
      count: number;
    }[];
  };
  userViewsOverlay: {
    max: number;
    data: {
      count: number;
    }[];
  };
  annotationsOverlay: any;
  highlightsOverlay: {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    metadata: {
      start: number;
      end: number;
    };
  }[][];
  annotationSelectSectionIndicators: {
    start: number;
    width: number;
  }[];
  annotationPickerPosition: {
    left: number;
    top: number;
  };
  initialized: boolean;
  duration: number;
  thumbnail: {
    height: number;
    width: number;
    url: string;
    sas: string;
  };
  segment: { start: number; end: number };
  onResize: (size: object) => void;
  onUnmount: () => void;
  selectSectionUpdate: (time: number, source: string, event: string) => void;
  videoPlayerSeek: (time: number) => void;
  deleteAnnotation: (id) => void;
  onMouseEnterAnnotation: (id) => void;
  onMouseLeaveAnnotation: () => void;
  showFilmstrip: boolean;
  setShowFilmstrip: (showFilmstrip: boolean) => void;
  graphMode: 'personal' | 'class';
  contextMenuHandler: (event, time) => void;
  contextMenuData: any;
  setContextMenuData: (contextMenuData) => void;
  oldMousePageX: number;
  setMousePageX: (value: number) => void;
  filmstripHoverCount: number;
  setFilmstripHoverCount: (value: number) => void;
}

const mapStateToProps = state => ({
  segment: selectors.getSegment(state),
  videoTimestampIndicators: selectors.getVideoTimestampIndicators(state),
  videoTimeMarkIndicators: selectors.getVideoTimeMarkIndicators(state),
  annotationSelectSectionIndicators: selectors.getAnnotationSelectSectionIndicators(
    state
  ),
  annotationsOverlay: selectors.getAnnotations(state),
  highlightsOverlay: selectors.getHighlights(state),
  userViewsOverlay: selectors.getUserViews(state),
  aggregatedViewsOverlay: selectors.getAggregatedViews(state),
  duration: ActiveVideoStore.selectors.getDuration(state),
  thumbnail: ActiveVideoStore.selectors.getThumbnail(state),
  filmstripSize: selectors.getPostProcessedSize(state),
  annotationPickerPosition: selectors.getAnnotationPickerPosition(state),
  initialized: selectors.getInitialized(state),
  graphMode: VideoPlayerStore.selectors.getGraphMode(state)
});

const mapDispatchToProps = {
  onResize: Filmstrip.actions.resize,
  onUnmount: Filmstrip.actions.deinit,
  selectSectionUpdate: AnnotationSelectSectionStore.actions.update,
  videoPlayerSeek: VideoPlayerStore.actions.seek,
  deleteAnnotation: AnnotationStore.actions.remove,
  onMouseEnterAnnotation: AnnotationStore.actions.select,
  onMouseLeaveAnnotation: AnnotationStore.actions.deselect
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillUnmount() {
      this.props.onUnmount();
    }
  }),
  withState('showFilmstrip', 'setShowFilmstrip', false),
  withState('contextMenuData', 'setContextMenuData', null),
  onlyUpdateForKeys([
    'showFilmstrip',
    'segment',
    'videoTimestampIndicators',
    'videoTimeMarkIndicators',
    'thumbnail',
    'initialized',
    'filmstripSize',
    'annotationSelectSectionIndicators',
    'highlightsOverlay',
    'annotationsOverlay',
    'graphMode',
    'contextMenuData'
  ]),
  withHandlers({
    contextMenuHandler: props => (e, time) => {
      props.setContextMenuData({
        xCoordinate: e.nativeEvent.layerX,
        yCoordinate: e.nativeEvent.layerY,
        time: time
      });
    }
  })
);

export default enhance((props: FilmstripContainerProps) => {
  return (
    <Measure
      bounds={true}
      onResize={contentRect => props.onResize(contentRect.bounds)}
    >
      {({ measureRef }) => (
        <Fragment>
          <div
            ref={measureRef}
            className="videx-filmstrip-display"
            onMouseEnter={() => {
              props.setShowFilmstrip(true);
            }}
            onMouseLeave={() => {
              props.setShowFilmstrip(false);
            }}
            onMouseOut={() => {
              props.setShowFilmstrip(false);
            }}
          >
            {props.annotationPickerPosition &&
              props.showFilmstrip && (
                <AnnotationPickerWrapper
                  {...props.annotationPickerPosition}
                  onMouseEnter={() => props.setShowFilmstrip(true)}
                  onMouseLeave={() => props.setShowFilmstrip(false)}
                />
              )}
            {props.initialized &&
              props.showFilmstrip && (
                <span
                  onMouseLeave={() => {
                    props.setShowFilmstrip(false);
                  }}
                >
                  <FilmstripSegment {...props} segment={props.segment} />
                </span>
              )}
            {props.initialized &&
              !props.showFilmstrip && (
                <HeatMap
                  mode={props.graphMode}
                  height={50}
                  width={props.filmstripSize.rowWidth}
                  userViews={props.userViewsOverlay}
                  aggregatedViews={props.aggregatedViewsOverlay}
                />
              )}
            {props.highlightsOverlay !== null &&
              !props.showFilmstrip && (
                <div style={{ marginBottom: '-10px' }}>
                  <HighlightOverlay
                    height={10}
                    width={props.filmstripSize.rowWidth}
                    highlights={props.highlightsOverlay}
                    deleteAnnotation={props.deleteAnnotation}
                  />
                </div>
              )}
          </div>
        </Fragment>
      )}
    </Measure>
  );
});
