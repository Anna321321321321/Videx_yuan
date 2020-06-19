import APICaller from '../../system/api-caller';
import * as actionTypes from './actionTypes';

export const init = () => {
  return dispatch => {
    APICaller.get('/api/v4/users', payload =>
      dispatch({
        payload,
        type: actionTypes.INIT
      })
    );
  };
};
