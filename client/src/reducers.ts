import { combineReducers } from 'redux';
import * as CourseLibraryContainer from './container/course-library-container';
import * as DashboardStore from './stores/dashboard-store';
import * as ActiveVideoStore from './stores/active-video-store';
import * as AggregatedViewsStore from './stores/aggregated-views-store';
import * as AnnotationSelectSectionStore from './stores/annotation-select-section-store';
import * as AnnotationsStore from './stores/annotations-store';
import * as Filmstrip from './stores/filmstrip';
import * as LessonLibraryStore from './stores/lesson-library-store';
import * as TranscriptStore from './stores/transcript-store';
import * as TreatmentStore from './stores/treatment-store';
import * as UserStore from './stores/user-store';
import * as VideoPlayerStore from './stores/video-player-store';
import * as ViewsStore from './stores/views-store';
import * as AnalyticsStore from './stores/analytics-store';

export default combineReducers({
  [UserStore.constants.NAME]: UserStore.reducer,
  [CourseLibraryContainer.constants.NAME]: CourseLibraryContainer.reducer,
  [DashboardStore.constants.NAME]: DashboardStore.reducer,
  [LessonLibraryStore.constants.NAME]: LessonLibraryStore.reducer,
  [ActiveVideoStore.constants.NAME]: ActiveVideoStore.reducer,
  [VideoPlayerStore.constants.NAME]: VideoPlayerStore.reducer,
  [AnnotationSelectSectionStore.constants.NAME]:
    AnnotationSelectSectionStore.reducer,
  [Filmstrip.constants.NAME]: Filmstrip.reducer,
  [ViewsStore.constants.NAME]: ViewsStore.reducer,
  [TranscriptStore.constants.NAME]: TranscriptStore.reducer,
  [AggregatedViewsStore.constants.NAME]: AggregatedViewsStore.reducer,
  [TreatmentStore.constants.NAME]: TreatmentStore.reducer,
  [AnnotationsStore.constants.NAME]: AnnotationsStore.reducer,
  [AnalyticsStore.constants.NAME]: AnalyticsStore.reducer
});
