import * as VideoPlayerStore from '../../stores/video-player-store';
import * as TranscriptStore from '../../stores/transcript-store';
import * as selectors from './selectors';

export const timeupdateEpic = (action$, store) =>
  action$.ofType(VideoPlayerStore.actionTypes.TIME_UPDATE).mergeMap(() => {
    const state = store.getState();
    if (TranscriptStore.selectors.getAutoScroll(state)) {
      const index = selectors
        .getSegmentsState(store.getState())
        .findIndex(segment => segment === true);
      if (index !== -1) {
        // this is coupled with TranscriptContainer component
        if (document.getElementById(`transcript-${index}`) !== null) {
          document
            .getElementById(`transcript-${index}`)
            .scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }
    return [];
  });
