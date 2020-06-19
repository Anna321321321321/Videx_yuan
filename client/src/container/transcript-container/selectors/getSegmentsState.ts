import { createSelector } from 'reselect';
import * as VideoPlayerStore from '../../../stores/video-player-store';
import getTranscript from './getTranscript';
import * as helpers from './helpers';

export const getSegmentsState = (transcripts, timestamp: number) =>
  transcripts.map(transcript => {
    if (timestamp) {
      return helpers.filter4point(transcript, timestamp);
    }
    return false;
  });

export default createSelector(
  getTranscript,
  VideoPlayerStore.selectors.getTime,
  (transcript, timestamp) => {
    if (!transcript) {
      return null;
    }
    return getSegmentsState(transcript, timestamp);
  }
);
