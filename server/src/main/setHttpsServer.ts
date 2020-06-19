import * as config from 'config';
import * as http from 'http';
import * as https from 'https';

export default (app, options) => {
  const port = 8080;
  const sslPort = 8081;

  // HTTP Server will simply redirect to HTTPS
  http
    .createServer((req, res) => {
      let location = `${config.get('SERVER.URL')}/${req.url}`;
      location = location.replace(/([^:]\/)\/+/g, '$1');
      res.writeHead(301, { Location: location });
      res.end();
    })
    .listen(port);

  https.createServer(options, app).listen(sslPort);
};
