import checkStatus from './checkStatus';

export default async (
  endpoint: string,
  headers,
  body,
  onSuccess: Function,
  onFail?: Function
) => {
  const res = await fetch(endpoint, {
    headers,
    body,
    method: 'DELETE',
    credentials: 'include'
  });
  checkStatus(res, onSuccess, onFail);
};
