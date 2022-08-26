import { combineEpics } from 'redux-observable';
import * as TranscriptContainer from './container/transcript-container';
import * as AggregatedViewsStore from './stores/aggregated-views-store';
import * as AnnotationSelectSectionStore from './stores/annotation-select-section-store';
import * as AnnotationsStore from './stores/annotations-store';
import * as LessonLibraryStore from './stores/lesson-library-store';
import * as TranscriptStore from './stores/transcript-store';
import * as TreatmentStore from './stores/treatment-store';
import * as VideoPlayerStore from './stores/video-player-store';
import * as ViewsStore from './stores/views-store';

export default combineEpics(
  ViewsStore.epics.fetchEpic,
  ViewsStore.epics.postEpic,
  ViewsStore.epics.deinitEpic,
  AnnotationSelectSectionStore.epics.updateEpic,
  AnnotationSelectSectionStore.epics.deinitEpic,
  LessonLibraryStore.epics.del,
  LessonLibraryStore.epics.search,
  TranscriptContainer.epics.timeupdateEpic,
  TranscriptStore.epics.deinitEpic,
  VideoPlayerStore.epics.deinit,
  VideoPlayerStore.epics.timeUpdate,
  VideoPlayerStore.epics.modeControl,
  AggregatedViewsStore.epics.fetchEpic,
  AggregatedViewsStore.epics.deinitEpic,
  TreatmentStore.epics.fetchEpic,
  AnnotationsStore.epics.fetchEpic,
  AnnotationsStore.epics.deinitEpic,
  AnnotationsStore.epics.addEpic,
  AnnotationsStore.epics.updateEpic,
  AnnotationsStore.epics.removeEpic,
  AnnotationsStore.epics.likeEpic,
  AnnotationsStore.epics.unlikeEpic,
  AnnotationsStore.epics.shareEpic,
  AnnotationsStore.epics.fetchShareEpic
);
