import { AjaxResponse, Observable } from 'rxjs';

export default (response: AjaxResponse) => {
  // remove the domain name from response.xhr.responseURL
  // compare those 2 links directly, if links are the same, return, otherwise redirect
  if (
    response.xhr.responseURL.replace(/^.*\/\/[^\/]+/, '') ===
    response.request.url
  ) {
    return response.response;
  } else {
    window.location.href = response.xhr.responseURL;
    throw new Error('Request Redirected');
  }
};
