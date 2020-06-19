import checkStatus from './checkStatus';

export default async (
  endpoint: string,
  body,
  onSuccess: Function,
  onFail?: Function
) => {
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json'
    },
    body,
    method: 'PUT',
    credentials: 'include'
  });
  checkStatus(res, onSuccess, onFail);
};
