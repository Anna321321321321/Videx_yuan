import { createSelector } from 'reselect';
import { NAME } from './constants';

export const nestedData = state => state[NAME];

export const subscribers = createSelector(nestedData, data =>
  data.get('subscribers')
);
export const lessonData = createSelector(nestedData, data =>
  data.get('lessonData')
);
export const lessonCountWithNameOverDate = createSelector(nestedData, data =>
  data.get('lessonCountWithNameOverDate')
);
export const calendarStartDate = createSelector(nestedData, data =>
  data.get('calendarStartDate')
);
export const calendarEndDate = createSelector(nestedData, data =>
  data.get('calendarEndDate')
);
export const calendarHeatmapData = createSelector(nestedData, data =>
  data.get('calendarHeatmapData')
);
export const releaseDate = createSelector(nestedData, data =>
  data.get('releaseDate')
);
export const initialized = createSelector(nestedData, data =>
  data.get('initialized')
);
export const lessonFilter = createSelector(nestedData, data =>
  data.get('lessonFilter')
);
