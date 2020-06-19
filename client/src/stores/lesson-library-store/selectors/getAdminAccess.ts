import { createSelector } from 'reselect';
import getMetadata from './getMetadata';

export default createSelector(
  getMetadata,
  (metadata: any) => metadata.adminAccess
);
