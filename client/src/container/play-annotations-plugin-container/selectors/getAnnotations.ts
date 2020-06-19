import { createSelector } from 'reselect';
import * as AnnotationsStore from '../../../stores/annotations-store';

export default createSelector(
  AnnotationsStore.selectors.getAnnotations,
  annotations => {
    if (!annotations) {
      return [];
    }
    return annotations;
  }
);
