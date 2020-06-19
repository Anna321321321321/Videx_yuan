import _ from 'lodash';

export default (lessonVisitObjectOverTime, calendarHeatmapBlank) => {
  if (lessonVisitObjectOverTime !== null) {
    let tempResult = _.values(lessonVisitObjectOverTime);
    let heatmapData = null;
    if (tempResult !== null && tempResult.length > 0) {
      // combine results with blank calendar data
      const mergeArray = [...tempResult, ...calendarHeatmapBlank];
      heatmapData = _.uniqBy(mergeArray, 'date');
      return heatmapData;
    }
    return calendarHeatmapBlank;
  } else {
    return calendarHeatmapBlank;
  }
};
