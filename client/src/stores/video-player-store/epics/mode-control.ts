import * as Logger from 'videx/client/logger';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';

const getInterval = (): { start: number; end: number } => {
  const urlParams = new URLSearchParams(window.location.search);
  if (
    urlParams.get('start') &&
    urlParams.get('end') &&
    !isNaN(parseInt(urlParams.get('start'), 10)) &&
    !isNaN(parseInt(urlParams.get('end'), 10))
  ) {
    return {
      start: parseInt(urlParams.get('start'), 10),
      end: parseInt(urlParams.get('end'), 10)
    };
  } else {
    return {
      start: null,
      end: null
    };
  }
};

export default action$ =>
  action$.ofType(actionTypes.LOADED_DATA).map(() => {
    const { start, end } = getInterval();
    if (start !== null && end !== null) {
      Logger.event('ActiveVideo.InitMode', { mode: 'interval' });
      return actions.playSharedInterval(start, end);
    } else {
      Logger.event('ActiveVideo.InitMode', { mode: null });
      return actions.play();
    }
  });
