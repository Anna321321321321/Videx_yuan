import * as config from 'config';

const oauthConstants = {
  authorizationURL:
    'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  clientID: config.get('OAUTH2.MICROSOFT.ID'),
  clientSecret: config.get('OAUTH2.MICROSOFT.SECRET'),
  callbackURL: `${config.get('SERVER.URL')}/auth/oauth2/callback`,
  scope: [
    'openid',
    'offline_access',
    'https://graph.microsoft.com/User.Read',
    'https://graph.microsoft.com/Notes.Create'
  ]
};

export { oauthConstants };
