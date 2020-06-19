import * as actionTypes from './actionTypes';

export const init = () => {
  return dispatch =>
    dispatch({
      payload: { id: 'adad', name: 'adad', type: 0, email: 'adaaada' },
      type: actionTypes.INIT
    });
};
