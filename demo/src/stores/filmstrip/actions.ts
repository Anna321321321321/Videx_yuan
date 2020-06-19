import ActionTypes from './actionTypes';

export const resize = payload => ({ payload, type: ActionTypes.RESIZE });

export const deinit = () => ({ type: ActionTypes.DEINIT });
