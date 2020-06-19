import { ajax } from 'rxjs/observable/dom/ajax';

export default (endpoint: string) =>
  ajax
    .delete(endpoint, { withCredentials: true })
    .map(response => response.response);
