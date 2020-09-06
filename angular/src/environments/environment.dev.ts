import * as manifest from '../../package.json';

export const environment = {
  config: 'app.config.json',
  identity: {
    clientId: '0oa5empza950mqdtw357',
    issuer: 'https://identity.rvtr.net/oauth2/default',
    pkce: true,
    redirectUri: `${location.protocol}//${location.host}/oauth2/authorize`,
    scopes: ['openid', 'profile', 'email'],
  },
  name: 'DEV',
  production: true,
  release: `rvtr-app-campsite@${manifest.version}`,
};
