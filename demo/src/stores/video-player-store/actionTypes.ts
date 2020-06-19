import * as constants from './constants';

export const LOADED_DATA = `${constants.NAME}/LOADED_DATA`;
export const TIME_UPDATE = `${constants.NAME}/TIME_UPDATE`;

export const TOGGLE_PLAY_PAUSE = `${constants.NAME}/TOGGLE_PLAY_PAUSE`;
export const PLAY = `${constants.NAME}/PLAY`;
export const PAUSE = `${constants.NAME}/PAUSE`;
export const SEEK = `${constants.NAME}/SEEK`;
export const DEINIT = `${constants.NAME}/DEINIT`;
export const SKIP_FORWARD = `${constants.NAME}/SKIP_FORWARD`;
export const SKIP_BACKWARD = `${constants.NAME}/SKIP_BACKWARD`;

// view graph
export const TOGGLE_GRAPH = `${constants.NAME}/TOGGLE_GRAPH`;

// play annotation function
// prettier-ignore
export const PLAY_ANNOTATIONS = `${constants.NAME}/PLAY_ANNOTATIONS`;
// prettier-ignore
export const STOP_PLAY_ANNOTATIONS = `${constants.NAME}/STOP_PLAY_ANNOTATIONS`;

// prettier-ignore
export const PLAY_SHARED_INTERVAL = `${constants.NAME}/PLAY_SHARED_INTERVAL`;
// prettier-ignore
export const STOP_PLAYING_SHARED_INTERVAL = `${constants.NAME}/STOP_PLAYING_SHARED_INTERVAL`;

export const TOGGLE_VIDEO_STATUS = `${constants.NAME}/TOGGLE_VIDEO_STATUS`;
