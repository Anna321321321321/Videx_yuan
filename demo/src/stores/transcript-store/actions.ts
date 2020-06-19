import * as actionTypes from './actionTypes';

export const controlAutoScroll = enable => {
  return { type: actionTypes.CONTROL_AUTO_SCROLL, payload: { enable } };
};
