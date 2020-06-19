import { createSelector } from 'reselect';
import * as AnnotationsStore from '../../../stores/annotations-store';
import * as helpers from './helpers';
import mergeTranscriptHighlights from './mergeTranscriptHighlights';
import * as ColorCore from '../../../core/color';

/**
 * this part only mutate the background color
 */
export const mergeTranscriptSelectedNote = (transcripts, selectedItem) => {
  const range = {
    start: selectedItem.start,
    end: selectedItem.end
  };
  return transcripts.map(transcript => {
    if (helpers.filter4segment(transcript, range)) {
      return transcript.update('words', words =>
        words.map(word => {
          // enhance opaqueness of background color
          // show grey if annotation has no color, otherwise increase opaqueness
          const showSelectedColor =
            selectedItem.color === null
              ? '#D3D3D3'
              : ColorCore.converters.hex2rgbOpaque(selectedItem.color);
          return word.update(
            'background',
            value =>
              helpers.filter4word(word, range) ? showSelectedColor : value
          );
        })
      );
    }
    return transcript;
  });
};

export default createSelector(
  mergeTranscriptHighlights,
  AnnotationsStore.selectors.getSelected,
  (transcripts, selectedItem) => {
    if (!selectedItem) {
      return transcripts;
    }
    if (!transcripts) {
      return null;
    }
    return mergeTranscriptSelectedNote(transcripts, selectedItem);
  }
);
