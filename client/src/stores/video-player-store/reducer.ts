import * as actionTypes from './actionTypes';

interface IVideoPlayerStoreReducer {
  time: number;
  mode: {
    status: null | 'interval' | 'annotations';
    properties: { start: number; end: number } | { annotations: any[] };
    graph: 'personal' | 'class';
  };
  player: any;
  videoStatus: null | 'playing' | 'paused'; // for telemetry, keep track what state the video is in => "playing" | "paused"
}

const INITIAL_STATE: IVideoPlayerStoreReducer = {
  time: 0,
  mode: {
    status: null,
    properties: null,
    graph: 'personal'
  },
  player: null,
  videoStatus: null
};

export default (
  state: IVideoPlayerStoreReducer = INITIAL_STATE,
  action
): IVideoPlayerStoreReducer => {
  try {
    switch (action.type) {
      case actionTypes.LOADED_DATA:
        return {
          ...state,
          videoStatus: 'playing',
          player: action.payload.player
        };

      case actionTypes.TIME_UPDATE:
        return {
          ...state,
          time: action.payload.time
        };

      case actionTypes.SEEK:
        if (state.player) {
          state.player.currentTime(action.payload.time);
        }
        return {
          ...state,
          mode: {
            status: null,
            properties: null,
            graph: state.mode.graph
          }
        };

      // trigger for space-bar
      case actionTypes.TOGGLE_PLAY_PAUSE:
        if (state.player) {
          if (state.player.paused()) {
            state.player.play();
          } else {
            state.player.pause();
          }
        }
        return state;

      case actionTypes.PLAY:
        if (state.player) {
          if (action.payload.time) {
            state.player.currentTime(action.payload.time);
            // play video player if play annotation is chosen
            if (state.mode.status === 'annotations') {
              state.player.play();
            }
          } else {
            state.player.play();
          }
        }
        return {
          ...state,
          videoStatus: 'playing'
        };

      case actionTypes.PAUSE:
        if (state.player) {
          state.player.pause();
        }
        return {
          ...state,
          videoStatus: 'paused'
        };

      case actionTypes.TOGGLE_GRAPH:
        return {
          ...state,
          mode: {
            ...state.mode,
            graph: action.payload.graph
          }
        };

      case actionTypes.PLAY_ANNOTATIONS:
        if (state.player) {
          state.player.currentTime(-1);
        }

        return {
          ...state,
          mode: {
            status: 'annotations',
            properties: action.payload.annotation,
            graph: state.mode.graph
          }
        };

      case actionTypes.STOP_PLAY_ANNOTATIONS:
        if (state.player) {
          state.player.pause();
        }
        return {
          ...state,
          mode: {
            status: null,
            properties: null,
            graph: state.mode.graph
          },
          videoStatus: 'paused'
        };

      case actionTypes.PLAY_SHARED_INTERVAL:
        if (state.player) {
          state.player.currentTime(action.payload.start);
          state.player.play();
        }
        return {
          ...state,
          mode: {
            status: 'interval',
            properties: {
              start: action.payload.start,
              end: action.payload.end
            },
            graph: state.mode.graph
          }
        };

      case actionTypes.STOP_PLAYING_SHARED_INTERVAL:
        if (state.player) {
          state.player.pause();
        }
        return {
          ...state,
          mode: {
            status: null,
            properties: null,
            graph: state.mode.graph
          },
          videoStatus: 'paused'
        };

      case actionTypes.SKIP_FORWARD:
        if (state.player) {
          state.player.currentTime(state.time + 5);
        }
        return state;

      case actionTypes.SKIP_BACKWARD:
        if (state.player) {
          state.player.currentTime(state.time - 5);
        }
        return state;

      case actionTypes.DEINIT:
        return INITIAL_STATE;

      case actionTypes.TOGGLE_VIDEO_STATUS:
        return {
          ...state,
          videoStatus: action.payload.status
        };

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
};
