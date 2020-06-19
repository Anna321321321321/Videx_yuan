import { ajax } from 'rxjs/observable/dom/ajax';

export default (endpoint: string, body: any) =>
  ajax
    .put(endpoint, body, {
      withCredentials: true,
      'Content-Type': 'application/json'
    })
    .map(response => response.response);
