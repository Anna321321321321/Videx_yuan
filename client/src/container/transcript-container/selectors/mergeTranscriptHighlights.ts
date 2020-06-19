import { createSelector } from 'reselect';
import * as ColorCore from '../../../core/color';
import * as AnnotationStore from '../../../stores/annotations-store';
import getTranscript from './getTranscript';
import * as helpers from './helpers';

export const mergeTranscriptHighlights = (
  transcripts,
  highlights: AnnotationStore.Annotation[]
) => {
  return transcripts.map(transcript =>
    transcript.update('words', words =>
      words.map(word => {
        const highlightArray: any[] = highlights.filter(highlight =>
          helpers.filter4word(word, {
            start: highlight.toObject().start,
            end: highlight.toObject().end
          })
        );

        const wordWithBackground = word.update('background', () =>
          ColorCore.converters.colors2gradient(
            highlightArray.reduce(
              (aggregator, highlight) => [...aggregator, highlight.color],
              []
            )
          )
        );

        if (highlightArray.length > 0) {
          //assign annotation data to word
          const wordWithBackgroundAndAnnotation = wordWithBackground.set(
            'annotationData',
            highlightArray[highlightArray.length - 1]
          );
          return wordWithBackgroundAndAnnotation;
        } else {
          return word;
        }
      })
    )
  );
};

export default createSelector(
  getTranscript,
  AnnotationStore.selectors.getHighlights,
  (transcript, highlight) => {
    if (!highlight || highlight.length === 0) {
      return transcript;
    }
    if (!transcript) {
      return null;
    }
    return mergeTranscriptHighlights(transcript, highlight);
  }
);
