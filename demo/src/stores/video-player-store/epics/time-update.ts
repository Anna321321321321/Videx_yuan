import { voidAction } from '../../actions';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as AnnotationsStore from '../../annotations-store';
import * as VideoPlayerStore from '../../video-player-store';

const playAnnotations = (
  annotations: any[],
  timestamp: number,
  onEnd: () => void,
  onNext: (timestamp: number) => void
) => {
  let index = annotations.findIndex(
    annotation => annotation.start <= timestamp && annotation.end >= timestamp
  );
  if (index === -1) {
    index = annotations.findIndex(annotation => annotation.start >= timestamp);
    if (index === -1) {
      return onEnd();
    } else {
      // workaround for https://www.chromestatus.com/features/6107495151960064
      return onNext(annotations[index].start);
    }
  } else {
    return voidAction();
  }
};

const playInterval = (
  interval: { start: number; end: number },
  timestamp: number,
  onEnd: () => void
) => {
  if (timestamp > interval.end) {
    return onEnd();
  } else {
    return voidAction();
  }
};

export default (action$, store) =>
  action$
    .ofType(actionTypes.TIME_UPDATE)
    .filter(() => selectors.getMode(store.getState()).status !== null)
    .map(action => {
      const mode = selectors.getMode(store.getState());
      switch (mode.status) {
        case 'annotations':
          return playAnnotations(
            VideoPlayerStore.selectors.getProperties(store.getState()),
            action.payload.time,
            actions.stopPlayAnnotations,
            actions.play
          );
        case 'interval':
          return playInterval(
            { start: mode.properties.start, end: mode.properties.end },
            action.payload.time,
            actions.stopPlaySharedInterval
          );
      }
    });
