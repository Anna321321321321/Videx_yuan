import fetch from 'node-fetch';
import * as passport from 'passport';
import * as refresh from 'passport-oauth2-refresh';
import { UserModel } from 'videx/server/entities';
import { oauthConstants } from './constants';

const OAuth2Strategy = require('passport-oauth2').Strategy;

const validateUser = async (
  oid,
  profile: { userPrincipalName: string; givenName: string; familyName: string },
  token,
  done
) => {
  if (!oid) {
    return done(new Error('No oid found'), null);
  }
  if (!profile) {
    return done(new Error('No name found'), null);
  }

  const curUser = {
    id: oid,
    name: `${profile.givenName} ${profile.familyName}`,
    userPrincipalName: profile.userPrincipalName,
    token
  };

  try {
    const user = await UserModel.findById(oid);
    if (!user) {
      await UserModel.create(oid);
    }
    done(null, curUser);
  } catch (e) {
    done(e);
  }
};

const oAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: oauthConstants.authorizationURL,
    tokenURL: oauthConstants.tokenURL,
    clientID: oauthConstants.clientID,
    clientSecret: oauthConstants.clientSecret,
    callbackURL: oauthConstants.callbackURL,
    scope: oauthConstants.scope
  },
  async (accessToken, refreshToken, profile, done) => {
    await validateUser(
      profile.id,
      {
        userPrincipalName: profile.userPrincipalName,
        givenName: profile.givenName,
        familyName: profile.surname
      },
      refreshToken,
      done
    );
  }
);

// https://github.com/jaredhanson/passport-oauth2/issues/73
oAuth2Strategy.userProfile = async (accesstoken, done) => {
  try {
    const res = await fetch('https://graph.microsoft.com/v1.0/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accesstoken}`
      }
    });
    if (res.ok) {
      done(null, await res.json());
    } else {
      return done(res.statusText);
    }
  } catch (e) {
    return done(e);
  }
};

passport.use('msft', oAuth2Strategy);
refresh.use('msft', oAuth2Strategy);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Microsoft Account profile is serialized
// and deserialized.
passport.serializeUser<any, any>((user, cb) => {
  cb(null, JSON.stringify(user));
});

passport.deserializeUser((serializedUser, cb) => {
  try {
    const user = JSON.parse(serializedUser);
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
});

export const configure = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};

export const getPassport = () => passport;
