import { createSelector } from 'reselect';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as AnalyticsStore from '../../stores/analytics-store';

export const getAnalyticsGraph = createSelector(
  ActiveVideoStore.selectors.getDuration,
  AnalyticsStore.selectors.getAnalytics,
  (duration, analytics: any) => {
    if (!duration || !analytics) {
      return null;
    }
    const annotationsCount = Array.from(Array(Math.round(duration)), (_, x) => {
      return { count: 0 };
    });

    const pauseCount = Array.from(Array(Math.round(duration)), (_, x) => {
      return { count: 0 };
    });

    let maxAnnotation = 0;
    if (analytics !== undefined && analytics.annotations !== null) {
      for (let i = 0; i < analytics.annotations.length; i++) {
        const start = parseInt(analytics.annotations[i].start) - 1;
        const end = parseInt(analytics.annotations[i].end) - 1;
        if (start !== NaN && end !== NaN) {
          for (let j = start; j <= end; j++) {
            if (annotationsCount[j] !== undefined) {
              const oldData = annotationsCount[j].count;
              annotationsCount[j] = { count: oldData + 1 };
              maxAnnotation =
                maxAnnotation < annotationsCount[j].count
                  ? annotationsCount[j].count
                  : maxAnnotation;
            }
          }
        }
      }
    }

    let maxPause = 0;
    if (analytics !== undefined && analytics.pauses !== null) {
      for (let i = 0; i < analytics.pauses.length; i++) {
        const videoTimestamp = parseInt(analytics.pauses[i].videoTimestamp);
        const timestampIndex = videoTimestamp - 1;
        // skip adding final log
        if (
          timestampIndex !== NaN &&
          pauseCount[timestampIndex] !== undefined &&
          timestampIndex !== Math.round(duration) - 1 &&
          timestampIndex !== Math.round(duration) - 2
        ) {
          pauseCount[timestampIndex] = { count: analytics.pauses[i].count };
          maxPause =
            maxPause < pauseCount[timestampIndex].count
              ? pauseCount[timestampIndex].count
              : maxPause;
        }
      }
    }
    let lessonSeeks =
      analytics.lessonSeeks == null ? 0 : analytics.lessonSeeks.length;
    return {
      annotationsCount: {
        max: maxAnnotation,
        data: annotationsCount
      },
      pausesCount: {
        max: maxPause,
        data: pauseCount
      },
      lessonSeeks: lessonSeeks
    };
  }
);
