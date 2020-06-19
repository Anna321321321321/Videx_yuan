import * as ActiveVideoStore from '../active-video-store';
import * as TranscriptStores from '../transcript-store';
import * as VideoPlayerStores from '../video-player-store';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as selectors from './selectors';

export const updateEpic = (action$, store) =>
  action$.ofType(actionTypes.UPDATE).mergeMap(action => {
    switch (action.payload.event) {
      case 'start':
        return [actions.start(action.payload)];
      case 'inprogress':
        const status = selectors.getStatus(store.getState());
        return status === 'busy' ? [actions.inprogress(action.payload)] : [];
      case 'end':
        if (action.payload.source === 'filmstrip') {
          const range = selectors.getSelectSection(store.getState());
          if (Math.abs(range.start - range.end) <= 0.5) {
            return [
              actions.clear(),
              VideoPlayerStores.actions.seek((range.start + range.end) / 2)
            ];
          } else {
            return [actions.end(action.payload)];
          }
        } else {
          const range = selectors.getSelectSection(store.getState());
          if (Math.abs(range.start - range.end) <= 0.5) {
            return [
              actions.clear(),
              VideoPlayerStores.actions.seek((range.start + range.end) / 2)
            ];
          } else {
            return [
              TranscriptStores.actions.controlAutoScroll(false),
              actions.end(action.payload)
            ];
          }
        }
    }
  });
