import handleError from './handleError';

export default async (response, onSuccess, onFail) => {
  if (response.redirected && response.url) {
    window.location.href = response.url;
  } else if (response.ok) {
    if (typeof onSuccess === 'function') {
      onSuccess(await response.json());
    }
  } else {
    if (typeof onFail === 'function') {
      onFail(response);
    } else {
      handleError();
    }
  }
};
