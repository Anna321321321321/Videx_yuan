import { combineEpics } from 'redux-observable';
import * as TranscriptContainer from './container/transcript-container';
import * as AnnotationSelectSectionStore from './stores/annotation-select-section-store';
import * as VideoPlayerStore from './stores/video-player-store';
import * as ViewsStore from './stores/views-store';

export default combineEpics(
  ViewsStore.epics.postEpic,
  AnnotationSelectSectionStore.epics.updateEpic,
  VideoPlayerStore.epics.timeUpdate,
  VideoPlayerStore.epics.modeControl,
  TranscriptContainer.epics.timeupdateEpic
);
