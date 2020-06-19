import ActionCreator from '../../system/action-creator';
import APICaller from '../../system/api-caller';
import _ from 'lodash';

export const types = {
  INIT: 'courses-library/INIT',
  DEINIT: 'courses-library/DEINIT'
};

export const init = () => {
  return dispatch => {
    APICaller.get('/api/v4/courses', payload =>
      dispatch({
        payload,
        type: types.INIT
      })
    );
  };
};

export const deinit = ActionCreator(types.DEINIT);
