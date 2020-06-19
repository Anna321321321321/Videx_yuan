import del from './del';
import get from './get';
import post from './post';
import put from './put';

export default class APICaller {
  public static get(endpoint: string, onSuccess: Function, onFail?: Function) {
    get(endpoint, onSuccess, onFail);
  }

  public static del(
    endpoint: string,
    headers,
    body,
    onSuccess: Function,
    onFail?: Function
  ) {
    del(endpoint, headers, body, onSuccess, onFail);
  }

  public static post(
    endpoint: string,
    body: object,
    onSuccess: (value: object) => void,
    onFail?: (value: object) => void
  ) {
    post(endpoint, body, onSuccess, onFail);
  }

  public static put(
    endpoint: string,
    body,
    onSuccess: Function,
    onFail?: Function
  ) {
    put(endpoint, body, onSuccess, onFail);
  }
}
