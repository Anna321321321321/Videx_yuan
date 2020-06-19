import { message } from 'antd';
import * as Logger from 'videx/client/logger';
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
  Logger.event('Player.FastForward');
  return { type: actionTypes.SKIP_FORWARD };
};

export const skipBackward = () => {
  Logger.event('Player.FastBackward');
  return { type: actionTypes.SKIP_BACKWARD };
};

export const toggleGraph = graph => {
  Logger.event('Player.ToggleHeatmap', { graph });
  return { type: actionTypes.TOGGLE_GRAPH, payload: { graph } };
};

//play annotations
export const playAnnotations = annotation => {
  Logger.event('Player.Annotations.Play', { annotation });
  return { payload: { annotation }, type: actionTypes.PLAY_ANNOTATIONS };
};

export const stopPlayAnnotations = () => {
  Logger.event('Player.Annotations.Stop');
  return { type: actionTypes.STOP_PLAY_ANNOTATIONS };
};

export const playSharedInterval = (start, end) => {
  Logger.event('Player.SharedInterval.Play');
  message.info('Playing Interval', 3);
  start = start < end ? start : end;
  end = end > start ? end : start;
  return { payload: { start, end }, type: actionTypes.PLAY_SHARED_INTERVAL };
};

export const stopPlaySharedInterval = () => {
  Logger.event('Player.SharedInterval.Stop');
  return { type: actionTypes.STOP_PLAYING_SHARED_INTERVAL };
};

export const toggleVideoStatus = status => {
  return { type: actionTypes.TOGGLE_VIDEO_STATUS, payload: { status: status } };
};
