import * as Logger from 'videx/client/logger';
import * as actionTypes from './actionTypes';

export const controlAutoScroll = enable => {
  if (enable) {
    Logger.event('Transcript.AutoScroll.Enable');
  }
  return { type: actionTypes.CONTROL_AUTO_SCROLL, payload: { enable } };
};
export const deinit = () => ({ type: actionTypes.DEINIT });
