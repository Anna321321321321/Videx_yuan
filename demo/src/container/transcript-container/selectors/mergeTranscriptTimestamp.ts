import { createSelector } from 'reselect';
import * as ActiveVideoStore from '../../../stores/active-video-store';
import * as VideoPlayerStore from '../../../stores/video-player-store';
import * as helpers from './helpers';
import mergeTranscriptSelectedNote from './mergeTranscriptSelectedNote';

export const mergeTranscriptTimestamp = (
  transcripts,
  timestamp: number,
  duration: number
) => {
  const range = {
    start: Math.max(0, timestamp - 0.5),
    end: Math.min(duration, timestamp + 0.5)
  };
  return transcripts.map(transcript => {
    if (helpers.filter4segment(transcript, range)) {
      return transcript.update('words', words =>
        words.map(word => {
          const filter = helpers.filter4word(word, range);
          return word
            .update('color', () => (filter ? '#0078D7' : '#212121'))
            .update('fontWeight', fontWeight => (filter ? 500 : fontWeight));
        })
      );
    }
    return transcript;
  });
};

export default createSelector(
  mergeTranscriptSelectedNote,
  VideoPlayerStore.selectors.getTime,
  ActiveVideoStore.selectors.getDuration,
  (transcript, timestamp, duration) => {
    if (!timestamp || !duration) {
      return transcript;
    }
    if (!transcript) {
      return null;
    }
    return mergeTranscriptTimestamp(transcript, timestamp, duration);
  }
);
