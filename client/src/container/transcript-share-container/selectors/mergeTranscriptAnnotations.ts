import { List, Map } from 'immutable';
import { createSelector } from 'reselect';
import * as AnnotationStore from '../../../stores/annotations-store';
import * as ActiveVideoStore from '../../../stores/active-video-store';
import getTranscript from './getTranscript';
import * as helpers from './helpers';

export const mergeTranscriptAnnotations = (
  transcripts,
  annotations: AnnotationStore.Annotation[]
) => {
  return transcripts.map((transcript) => {
    let annotationsList;
    annotationsList = annotations
      .filter((annotation) =>
        helpers.filter4initialsegment(
          transcript,
          annotation.toObject().start,
          annotation.toObject().end
        )
      )
      .reduce(
        (aggregator, annotation, ids) =>
          aggregator.push(Map({ annotation, ids })),
        List([])
      );
    return annotationsList.size === 0 ? null : annotationsList;
  });
};

export default createSelector(
  getTranscript,
  AnnotationStore.selectors.getAnnotations,
  (transcripts, annotations) => {
    if (!annotations || annotations.length === 0) {
      return null;
    }
    if (!transcripts) {
      return null;
    }
    return mergeTranscriptAnnotations(transcripts, annotations);
  }
);
