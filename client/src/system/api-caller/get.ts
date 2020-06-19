import checkStatus from './checkStatus';

export default async (
  endpoint: string,
  onSuccess: Function,
  onFail?: Function
) => {
  const res = await fetch(endpoint, {
    method: 'GET',
    credentials: 'include'
  });
  checkStatus(res, onSuccess, onFail);
};
