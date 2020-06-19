import CircuitBreaker from 'videx/server/core/circuit-breaker';

export default (app, reactor) => {
  app.get('/_next/*', (req, res) => {
    const handle = reactor.getRequestHandler();
    return handle(req, res);
  });

  app.get('/login', (req, res) => {
    return reactor.render(req, res, '/login', req.query);
  });

  app.get('/terms', (req, res) => {
    return reactor.render(req, res, '/terms', req.query);
  });

  app.get('/consent', (req, res) => {
    return reactor.render(req, res, '/consent', req.query);
  });

  app.get('/faq', (req, res) => reactor.render(req, res, '/faq', req.query));

  app.get('/research', (req, res) => {
    return reactor.render(req, res, '/research', req.query);
  });

  app.get('/error', (req, res) =>
    reactor.render(req, res, '/error', req.query)
  );

  app.use((req, res, next) => {
    if (!CircuitBreaker.getStatus()) {
      res.redirect('/error?code=503');
      return;
    } else {
      return next();
    }
  });
};
