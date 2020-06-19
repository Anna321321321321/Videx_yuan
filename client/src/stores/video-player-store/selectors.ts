import { createSelector } from 'reselect';
import { NAME } from './constants';

const getAll = state => state[NAME];

export const getTime = createSelector<any, any, number>(
  getAll,
  data => data.time
);

interface IGetMode {
  status: null | 'annotations' | 'interval';
  properties: { start: number; end: number; color: string };
}

export const getVideoStatus = createSelector<any, any, any>(
  getAll,
  data => data.videoStatus
);

export const getGraphMode = createSelector<any, any, IGetMode>(
  getAll,
  data => data.mode.graph
);

export const getProperties = createSelector<any, any, any>(
  getAll,
  data => data.mode.properties
);

export const getStatus = createSelector<any, any, any>(
  getAll,
  data => data.mode.status
);

export const getMode = createSelector<any, any, IGetMode>(
  getAll,
  data => data.mode
);

export const isInitialized = createSelector<any, any, boolean>(
  getAll,
  data => !!data.player
);
