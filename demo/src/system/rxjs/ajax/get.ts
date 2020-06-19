import { ajax } from 'rxjs/observable/dom/ajax';
import checkResponse from './checkResponse';

export default (endpoint: string, check = true) =>
  ajax.get(endpoint, { withCredentials: true }).map(response => {
    if (check) {
      return checkResponse(response);
    } else {
      return response.response;
    }
  });
