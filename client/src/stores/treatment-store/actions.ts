import APICaller from '../../system/api-caller';
import * as actionTypes from './actionTypes';

export const init = payload => ({ payload, type: actionTypes.INIT });
