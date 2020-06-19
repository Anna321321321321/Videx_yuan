import checkStatus from './checkStatus';

export default async (
  endpoint: string,
  body: object,
  onSuccess: (value: object) => void,
  onFail?: (value: object) => void
) => {
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    method: 'POST',
    credentials: 'include'
  });
  checkStatus(res, onSuccess, onFail);
};
