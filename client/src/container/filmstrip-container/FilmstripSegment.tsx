import React from 'react';
import { compose, onlyUpdateForKeys, withHandlers, withState } from 'recompose';
import CursorPosition from '../../components/cursor-position';
import {
  AnnotationSelectSectionIndicator,
  CursorIndicator,
  EventWrapper,
  HeatMap,
  HighlightOverlay,
  IndicatorsWrapper,
  Thumbnail,
  TimestampIndicator
} from '../../components/filmstrip';
import './style/index.scss';

export default props => {
  return (
    <CursorPosition
      className="videx-filmstrip-container"
      style={{
        height: props.filmstripSize.rowHeight,
        width: props.filmstripSize.rowWidth
      }}
    >
      <EventWrapper
        width={props.filmstripSize.rowWidth}
        segment={props.segment}
        onMouseEvent={props.selectSectionUpdate}
        onContextMenu={props.contextMenuHandler}
      >
        <Thumbnail
          segment={props.segment}
          filmstripSize={props.filmstripSize}
          videoDuration={props.duration}
          thumbnail={props.thumbnail}
          contextMenuData={props.contextMenuData}
        />
        <HeatMap
          mode={props.graphMode}
          height={50}
          width={props.filmstripSize.rowWidth}
          userViews={props.userViewsOverlay}
          aggregatedViews={props.aggregatedViewsOverlay}
        />

        <IndicatorsWrapper
          height={props.filmstripSize.rowHeight}
          width={props.filmstripSize.rowWidth}
        >
          <CursorIndicator
            height={props.filmstripSize.rowHeight}
            width={props.filmstripSize.rowWidth}
            segment={props.segment}
          />
          {props.videoTimestampIndicators && (
            <TimestampIndicator
              height={props.filmstripSize.rowHeight}
              pixels={props.videoTimestampIndicators}
            />
          )}
          {props.annotationSelectSectionIndicators &&
            props.annotationSelectSectionIndicators && (
              <AnnotationSelectSectionIndicator
                {...props.annotationSelectSectionIndicators}
                height={props.filmstripSize.rowHeight}
              />
            )}
        </IndicatorsWrapper>
        <div style={{ marginBottom: '-4px' }}>
          <HighlightOverlay
            height={10}
            width={props.filmstripSize.rowWidth}
            highlights={props.highlightsOverlay}
            deleteAnnotation={props.deleteAnnotation}
          />
        </div>
      </EventWrapper>
    </CursorPosition>
  );
};
