import moment from 'moment';
import { createSelector } from 'reselect';
import * as FilmstripCore from '../../core/filmstrip';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as AggregatedViewsStore from '../../stores/aggregated-views-store';
import * as AnnotationSelectSectionStore from '../../stores/annotation-select-section-store';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as FilmstripStore from '../../stores/filmstrip';
import * as VideoPlayerStore from '../../stores/video-player-store';
import * as ViewsStore from '../../stores/views-store';

export const getPostProcessedSize = createSelector(
  FilmstripStore.selectors.getFilmstripSize,
  ActiveVideoStore.selectors.getThumbnail,
  (size, thumbnail) => {
    if (!size || !thumbnail) {
      return null;
    }

    // single row for filmstrip
    const rowsNumber: number = 1;
    let colsNumber: number = 1;
    let thumbnailHeight: number = 0;
    let thumbnailWidth: number = 0;
    let counter = 1;
    for (let i = 1; i < 20; i++) {
      counter = i;
      thumbnailHeight = thumbnail.height / counter;
      if (thumbnailHeight < 200) {
        break;
      }
    }
    thumbnailWidth = thumbnail.width / counter;
    colsNumber = Math.floor(size.width / thumbnailWidth);
    return {
      rowsNumber,
      colsNumber,
      rowHeight: thumbnailHeight,
      rowWidth: size.width
    };
  }
);

export const getSegment = createSelector(
  getPostProcessedSize,
  ActiveVideoStore.selectors.getDuration,
  (size, duration) => {
    if (!size || !duration) {
      return null;
    }
    return {
      start: 0,
      end: duration
    };
  }
);

export const getInitialized = createSelector(
  getPostProcessedSize,
  size => !!size
);

export const getHighlights = createSelector(
  getPostProcessedSize,
  getSegment,
  AnnotationsStore.selectors.getAnnotations,
  (size, segment, highlights) => {
    if (!size || !segment || !highlights) {
      return null;
    }
    const baseHeight: number =
      1 / FilmstripCore.constants.HIGHLIGHT_COLOR_COUNT;

    const result = [];
    highlights.forEach((highlight, index) => {
      let start: number = FilmstripCore.helpers.timestamp2pixels(
        highlight.toObject().start,
        segment,
        size.rowWidth
      );
      let end: number = FilmstripCore.helpers.timestamp2pixels(
        highlight.toObject().end,
        segment,
        size.rowWidth
      );

      if (start > size.rowWidth) {
        return;
      } else if (start < 0) {
        start = 0;
      }

      if (end > size.rowWidth) {
        end = size.rowWidth;
      }

      if (
        start >= 0 &&
        end <= size.rowWidth &&
        end > start &&
        highlight.toObject().color !== null
      ) {
        result.push({
          key: `${highlight.toObject().color}-${index}`,
          id: highlight.toObject().id,
          x: start,
          y: baseHeight * 4,
          width: end - start,
          height: baseHeight,
          // @ts-ignore
          fill: highlight.color,
          metadata: {
            start: highlight.toObject().start,
            end: highlight.toObject().end
          },
          annotation: highlight
        });
      }
    });
    return result;
  }
);

export const getVideoTimestampIndicators = createSelector(
  getPostProcessedSize,
  getSegment,
  VideoPlayerStore.selectors.getTime,
  (size, segment, timestamp) => {
    if (!size || !segment || !timestamp) {
      return null;
    }
    if (timestamp > segment.start && timestamp < segment.end) {
      return FilmstripCore.helpers.timestamp2pixels(
        timestamp,
        segment,
        size.rowWidth
      );
    } else {
      return null;
    }
  }
);

export const getVideoTimeMarkIndicators = createSelector(
  getPostProcessedSize,
  getSegment,
  (size, segment) => {
    if (!size || !segment) {
      return null;
    }
    const result = [];
    for (let i: number = 1; i <= 2; i += 1) {
      const x = (size.rowWidth / 3) * i;
      result.push({
        x,
        y: size.rowHeight * 0.75,
        content: moment('2000-01-01 00:00:00')
          .startOf('day')
          .seconds(
            FilmstripCore.helpers.pixels2timestamp(x, segment, size.rowWidth)
          )
          .format('HH:mm:ss')
      });
    }
    return result;
  }
);

export const getAnnotationSelectSectionIndicators = createSelector(
  getPostProcessedSize,
  getSegment,
  AnnotationSelectSectionStore.selectors.getSelectSection,
  AnnotationSelectSectionStore.selectors.getStatus,
  (size, segment, selectSection, selectSectionStatus) => {
    if (!size || !segment) {
      return null;
    }
    if (selectSectionStatus !== 'free') {
      // calculate the start time and end time of the highlight select section
      const selectSectionEnd =
        selectSection.end > selectSection.start
          ? selectSection.end
          : selectSection.start;
      const selectSectionStart =
        selectSection.start > selectSection.end
          ? selectSection.end
          : selectSection.start;

      const segmentEnd =
        selectSectionEnd > segment.end ? segment.end : selectSectionEnd;
      const segmentStart =
        selectSectionStart < segment.start ? segment.start : selectSectionStart;

      // check the start time and end time is valid or not
      if (segmentStart < segmentEnd) {
        return {
          start: FilmstripCore.helpers.timestamp2pixels(
            segmentStart,
            segment,
            size.rowWidth
          ),
          width:
            FilmstripCore.helpers.timestamp2pixels(
              segmentEnd,
              segment,
              size.rowWidth
            ) -
            FilmstripCore.helpers.timestamp2pixels(
              segmentStart,
              segment,
              size.rowWidth
            )
        };
      } else {
        return null;
      }
    }
    return null;
  }
);

export const getAggregatedViews = createSelector(
  getSegment,
  ActiveVideoStore.selectors.getDuration,
  AggregatedViewsStore.selectors.getViews,
  (segment, duration, views) => {
    if (!segment || !duration) {
      return null;
    }
    const tmp = Array(Math.round(duration))
      .fill(0)
      .map(() => ({ count: 0 }));
    let max = Number.MIN_SAFE_INTEGER;
    Object.keys(views).forEach(time => {
      if (views.hasOwnProperty(time)) {
        tmp[time] = { count: views[time] };
        max = max > views[time] ? max : views[time];
      }
    });
    return {
      max: max,
      data: tmp.slice(Math.round(segment.start), Math.round(segment.end))
    };
  }
);

export const getUserViews = createSelector(
  getSegment,
  ActiveVideoStore.selectors.getDuration,
  ViewsStore.selectors.getViews,
  (segment, duration, views) => {
    if (!segment || !duration) {
      return null;
    }
    const tmp = Array(Math.round(duration))
      .fill(0)
      .map(() => ({ count: 0 }));
    let max = Number.MIN_SAFE_INTEGER;
    Object.keys(views).forEach(time => {
      if (views.hasOwnProperty(time)) {
        tmp[time] = { count: views[time] };
        max = max > views[time] ? max : views[time];
      }
    });
    return {
      max: max,
      data: tmp.slice(Math.round(segment.start), Math.round(segment.end))
    };
  }
);

export const getAnnotationPickerPosition = createSelector(
  getSegment,
  getPostProcessedSize,
  AnnotationSelectSectionStore.selectors.getStatus,
  AnnotationSelectSectionStore.selectors.getSelectSection,
  AnnotationSelectSectionStore.selectors.getSource,
  FilmstripStore.selectors.getFilmstripSize,
  (segment, size, status, section, source, filmstripSize) => {
    if (!segment || !size || source !== 'filmstrip' || status !== 'end') {
      return null;
    }
    let top = 0.5 * size.rowHeight;
    let left = FilmstripCore.helpers.timestamp2pixels(
      section.end,
      segment,
      size.rowWidth
    );
    top = Math.min(top, Math.max(filmstripSize.height - 139, 0));
    left = Math.min(left, Math.max(filmstripSize.width - 215, 0));
    return {
      top,
      left
    };
  }
);

export const getAnnotations = createSelector(
  getSegment,
  getPostProcessedSize,
  AnnotationsStore.selectors.getAnnotations,
  (segment, size, annotations) => {
    if (!segment || !size) {
      return null;
    }

    // TODO: NEED TO CALCULATE THRESHOLD BASED ON CURRENT WIDTH PIXEL VALUE
    return annotations
      .reduce((aggregator, annotation) => {
        aggregator.push({
          time: annotation.toObject().start,
          annotations: [annotation]
        });
        return aggregator;
      }, [])
      .map(annotation => {
        return {
          position: FilmstripCore.helpers.timestamp2pixels(
            annotation.time,
            segment,
            size.rowWidth
          ),
          annotations: annotation.annotations
        };
      });
  }
);
