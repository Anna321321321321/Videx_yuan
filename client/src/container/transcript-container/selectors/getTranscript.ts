import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import * as ActiveVideoStore from '../../../stores/active-video-store';
import * as helpers from './helpers';

export const getTranscript = transcripts =>
  fromJS(
    transcripts.map(transcript => ({
      range: {
        start: transcript.start,
        end: transcript.end
      },
      words: helpers.string2lut(transcript)
    }))
  );

export default createSelector(
  ActiveVideoStore.selectors.getTranscriptText,
  transcript => {
    if (!transcript) {
      return null;
    }
    return getTranscript(transcript);
  }
);
