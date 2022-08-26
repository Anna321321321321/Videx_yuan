import { createSelector } from 'reselect';
import * as AnnotationSelectSectionStore from '../../../stores/annotation-select-section-store';
import * as helpers from './helpers';
import getTranscript from './getTranscript';

export const getToolPosition = (transcripts, status, section, source) => {
  if (!transcripts || source !== 'transcript' || status !== 'end') {
    return null;
  }
  const index1 = transcripts.findIndex(transcript =>
    helpers.filter4point(transcript, section.end)
  );
  const index2 = transcripts
    .getIn([index1, 'words'])
    .findIndex(word => helpers.filter4point(word, section.end));
  return [index1, index2];
};

export default createSelector(
  getTranscript,
  AnnotationSelectSectionStore.selectors.getStatus,
  AnnotationSelectSectionStore.selectors.getSelectSection,
  AnnotationSelectSectionStore.selectors.getSource,
  (transcript, status, section, source) => {
    return getToolPosition(transcript, status, section, source);
  }
);
