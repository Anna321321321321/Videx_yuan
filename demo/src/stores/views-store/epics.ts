import * as ActiveVideoStore from '../active-video-store';
import * as VideoPlayerStore from '../video-player-store';
import * as actions from './actions';

export const postEpic = (action$, store) =>
  action$
    .ofType(VideoPlayerStore.actionTypes.TIME_UPDATE)
    .pluck('payload', 'time')
    .bufferTime(10000)
    .filter(value => value.length !== 0)
    .map(value => actions.post(value));
