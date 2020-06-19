import immutable, { fromJS } from 'immutable';
import * as actions from './actions';
import _ from 'lodash';
import moment from 'moment';
import * as helpers from './helpers';

const INITIAL_STATE: immutable.Map<any, any> = fromJS({
  subscribers: 0,
  initialized: false,
  releaseDate: null,
  lessonData: [],
  lessonCountWithNameOverDate: null,
  calendarStartDate: null,
  calendarEndDate: null,
  calendarHeatmapBlank: null,
  lessonVisitNameOverTime: [],
  lessonCountGroupByDate: null,
  lessonIdNameMap: null,
  lessonFilter: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.types.INIT:
      let lessonData = new Array();
      let lessonIdNameMap = null;
      let lessonCountWithNameOverDate = null;
      let lessonCountGroupByDate = null;
      const {
        calendarHeatmapBlank,
        calendarStartDate,
        calendarEndDate
      } = helpers.getBlankDateRange();
      let subscribers = 0;
      if (
        action.payload.activeSubscribers.rows.length !== 0 &&
        action.payload.lessonVisitNameOverTime.rows.length > 0 &&
        action.payload.totalViewCountOverTime.rows.length > 0
      ) {
        subscribers = action.payload.activeSubscribers.rows[0][1];
        lessonData = action.payload.lessonData.map(lesson => {
          return {
            id: lesson.id,
            publish: lesson.publish,
            name: lesson.name
          };
        });

        lessonIdNameMap = action.payload.lessonData.reduce((map, item) => {
          map[item.id] = item.name;
          return map;
        }, {});

        // map date: count
        lessonCountGroupByDate = action.payload.totalViewCountOverTime.rows.reduce(
          (map, item) => {
            const dateKey = moment(item[0])
              .utc()
              .format('YYYY-MM-DD');
            map[dateKey] = item[1];
            return map;
          },
          {}
        );
        // merge date and lesson name
        lessonCountWithNameOverDate = helpers.getLessonVisitObjectOverTime(
          action.payload.lessonVisitNameOverTime,
          lessonCountGroupByDate,
          lessonIdNameMap
        );
      }

      const calendarHeatmapData = helpers.getHeatmapData(
        lessonCountWithNameOverDate,
        calendarHeatmapBlank
      );

      return state
        .merge(action.payload)
        .set('lessonFilter', [])
        .set('subscribers', subscribers)
        .set('calendarStartDate', calendarStartDate)
        .set('calendarEndDate', calendarEndDate)
        .set('calendarHeatmapData', calendarHeatmapData)
        .set('initialized', true)
        .set('lessonData', lessonData)
        .set('lessonCountWithNameOverDate', lessonCountWithNameOverDate)
        .set(
          'lessonVisitNameOverTime',
          action.payload.lessonVisitNameOverTime.rows.length !== 0
            ? action.payload.lessonVisitNameOverTime.rows
            : []
        )
        .set('lessonCountGroupByDate', lessonCountGroupByDate)
        .set('lessonIdNameMap', lessonIdNameMap);

    case actions.types.CALENDAR_FILTER:
      const newArray = [...action.payload];
      return state.set('lessonFilter', newArray);

    case actions.types.DEINIT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
