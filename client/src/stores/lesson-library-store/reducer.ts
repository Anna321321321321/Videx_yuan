import * as actionTypes from './actionTypes';
import * as helpers from './helpers';
import * as LocalStorage from '../../system/local-storage';
import _ from 'lodash';

type LessonLibraryState = {
  lessons: any[];
  metadata: object;
  selectedCategory: string;
  selectedWeek: string;
  searchedLessons: string[];
  isInitialized: boolean;
  subscribers: number;
  lessonCount: number;
  analyticsMode: boolean;
  completeWatch: number;
  showDrawer: boolean;
};

const INITIAL_STATE: LessonLibraryState = {
  lessons: [],
  metadata: {},
  selectedCategory: 'all',
  selectedWeek: null,
  searchedLessons: null,
  isInitialized: false,
  subscribers: 0,
  lessonCount: 0,
  analyticsMode: false,
  completeWatch: 0,
  showDrawer: false,
};

export default (state = INITIAL_STATE, action): LessonLibraryState => {
  switch (action.type) {
    case actionTypes.INIT:
      let activeSubscribers = 0;
      if (
        action.payload.metadata.adminAccess &&
        action.payload.activeSubscribers.rows.length !== 0
      ) {
        activeSubscribers = action.payload.activeSubscribers.rows[0][1];
        const lessonViews = helpers.arrayToHashmap(
          action.payload.sessionsPerLesson
        );

        //lessonid, unique_sessions_count
        const uniqueLessonSessionsObject = helpers.arrayToHashmap(
          action.payload.uniqueSessionsPerLesson
        );

        const pausesObject = helpers.arrayToHashmap(
          action.payload.coursePauses
        );

        // lessonId, duration
        let averageViewTime = action.payload.averageViewTime.rows.reduce(
          (map, item) => {
            const splitTime = item[1].split(':');
            if (
              parseInt(splitTime[0]) >= 0 &&
              parseInt(splitTime[0]) % 1 === 0
            ) {
              const totalTime =
                parseInt(splitTime[0]) * 3600 +
                parseInt(splitTime[1]) * 60 +
                parseInt(splitTime[2]);
              map[item[0]] = helpers.time2string(totalTime);
              return map;
            } else {
              return map;
            }
          },
          {}
        );

        action.payload.lessons.map(lesson => {
          lesson.uniqueStudents =
            uniqueLessonSessionsObject[lesson.id] !== undefined
              ? uniqueLessonSessionsObject[lesson.id]
              : 0;

          lesson['pausesCount'] = pausesObject[lesson.id] !== undefined ? pausesObject[lesson.id] : 0;

          // calculate duration in string
          if (lesson.duration !== null) {
            lesson.duration = helpers.time2string(lesson.duration);
          }
          lesson['totalViews'] =
            lessonViews[lesson.id] !== undefined ? lessonViews[lesson.id] : 0;
            lesson['averageViewTime'] = 0;
          if (_.has(averageViewTime, lesson.id)) {
            lesson['averageViewTime'] = averageViewTime[lesson.id];
          }
          return lesson;
        });
      } else {
        action.payload.lessons.map(item => {
          if (item.duration !== null) {
            item.duration = helpers.time2string(item.duration);
          }
          return item;
        });
      }

      action.payload.lessons = action.payload.lessons.map(lesson => ({
        ...lesson,
        annotations: lesson.annotations.map(annotation => ({
          ...annotation,
          transcript: helpers.mergeAnnotationTranscript(
            annotation,
            lesson.transcript
          ),
        })),
      }));

      // check if selectedCategory exists
      const selectedCategory = LocalStorage.getItem(
        LocalStorage.LocalStorageKeys.SELECTED_CATEGORY
      );

      return {
        ...state,
        subscribers: activeSubscribers,
        lessonCount: action.payload.lessons.length,
        lessons: action.payload.lessons,
        metadata: action.payload.metadata,
        isInitialized: true,
        selectedCategory: selectedCategory === null ? 'all' : selectedCategory
      };

    case actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        searchedLessons: action.payload
      };

    case actionTypes.SEARCH_RESET:
      return {
        ...state,
        searchedLessons: null
      };

    case actionTypes.SELECT_WEEK:
      return {
        ...state,
        selectedWeek: action.payload
      };

    case actionTypes.SELECT_CATEGORY:
      // change in localStorage
      LocalStorage.setItem(
        LocalStorage.LocalStorageKeys.SELECTED_CATEGORY,
        action.payload
      );
      return {
        ...state,
        selectedCategory: action.payload
      };

    case actionTypes.DEINIT:
      return INITIAL_STATE;

    case actionTypes.SHOW_ANALYTICS:
      return {
        ...state,
        analyticsMode: !state.analyticsMode
      };

    case actionTypes.SHOW_DRAWER:
      return {
        ...state,
        showDrawer: !state.showDrawer
      };

    default:
      return state;
  }
};
