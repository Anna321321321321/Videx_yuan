import { combineReducers } from 'redux';
import * as ActiveVideoStore from './stores/active-video-store';
import * as AnnotationSelectSectionStore from './stores/annotation-select-section-store';
import * as Filmstrip from './stores/filmstrip';
import * as TranscriptStore from './stores/transcript-store';
import * as VideoPlayerStore from './stores/video-player-store';
import * as ViewsStore from './stores/views-store';
import * as AnnotationsStore from './stores/annotations-store';
import * as UserStore from './stores/user-store';

export default combineReducers({
  [ActiveVideoStore.constants.NAME]: ActiveVideoStore.reducer,
  [AnnotationsStore.constants.NAME]: AnnotationsStore.reducer,
  [VideoPlayerStore.constants.NAME]: VideoPlayerStore.reducer,
  [AnnotationSelectSectionStore.constants.NAME]:
    AnnotationSelectSectionStore.reducer,
  [Filmstrip.constants.NAME]: Filmstrip.reducer,
  [ViewsStore.constants.NAME]: ViewsStore.reducer,
  [TranscriptStore.constants.NAME]: TranscriptStore.reducer,
  [UserStore.constants.NAME]: UserStore.reducer
});
