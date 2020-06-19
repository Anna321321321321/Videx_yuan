const assetPattern = new RegExp('(\\/[^\\.\\s]+\\.{1}[^\\.\\s]{2,4}\\/?)$');
const htmlPattern = new RegExp('html\\/?$');

// Use this route middleware on any resource that needs to be protected.  If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
export default (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // Need to check to make sure we don't store the returnTo url to some static asset request
    // This specifically manifests in Chrome where for each request to a page, it also requests
    // the favicon.ico file for it even when the page is not yet loaded (and it's always the second request).
    if (!req.path.match(assetPattern) || req.path.match(htmlPattern)) {
      req.session.returnTo = req.path;
    }
    if (req.path === '/consent/shareInfo') {
      res.redirect('/auth/oauth2/login');
    } else {
      res.redirect('/login');
    }
    return;
  }
};
