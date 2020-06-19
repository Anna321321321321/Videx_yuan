import * as Logger from 'videx/client/logger';
import * as actionTypes from './actionTypes';

export const update = (time: number, source: string, event: string) => ({
  payload: { time, source, event },
  type: actionTypes.UPDATE
});

export const start = payload => ({ payload, type: actionTypes.START });
export const inprogress = payload => ({
  payload,
  type: actionTypes.IN_PROGRESS
});
export const end = payload => ({ payload, type: actionTypes.END });

// this is actually as same as clear, but it will Logger the telemetry
export const cancel = () => {
  Logger.event('SelectSection.Clear');
  return { type: actionTypes.CLEAR };
};

export const clear = () => {
  return { type: actionTypes.CLEAR };
};
