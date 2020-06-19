import { message } from 'antd';
import * as actionTypes from './actionTypes';
export const loadeddata = player => ({
  type: actionTypes.LOADED_DATA,
  payload: { player }
});
export const timeupdate = time => ({
  type: actionTypes.TIME_UPDATE,
  payload: { time }
});
export const seek = time => ({ type: actionTypes.SEEK, payload: { time } });
export const deinit = () => ({ type: actionTypes.DEINIT });
export const togglePlayPause = () => ({ type: actionTypes.TOGGLE_PLAY_PAUSE });
export const play = (time?) => ({ type: actionTypes.PLAY, payload: { time } });
export const pause = () => ({ type: actionTypes.PAUSE });

// playback skip function
export const skipForward = () => {
  return { type: actionTypes.SKIP_FORWARD };
};

export const skipBackward = () => {
  return { type: actionTypes.SKIP_BACKWARD };
};

export const toggleGraph = graph => {
  return { type: actionTypes.TOGGLE_GRAPH, payload: { graph } };
};

//play annotations
export const playAnnotations = annotation => {
  return { payload: { annotation }, type: actionTypes.PLAY_ANNOTATIONS };
};

export const stopPlayAnnotations = () => {
  return { type: actionTypes.STOP_PLAY_ANNOTATIONS };
};

export const playSharedInterval = (start, end) => {
  message.info('Playing Interval', 3);
  start = start < end ? start : end;
  end = end > start ? end : start;
  return { payload: { start, end }, type: actionTypes.PLAY_SHARED_INTERVAL };
};

export const stopPlaySharedInterval = () => {
  return { type: actionTypes.STOP_PLAYING_SHARED_INTERVAL };
};

export const toggleVideoStatus = status => {
  return { type: actionTypes.TOGGLE_VIDEO_STATUS, payload: { status: status } };
};
