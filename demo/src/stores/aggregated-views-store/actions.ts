import * as actionTypes from './actionTypes';

export const fetch = payload => ({ payload, type: actionTypes.FETCH });
export const deinit = () => ({ type: actionTypes.DEINIT });
