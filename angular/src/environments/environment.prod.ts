import { Environment } from '../environment';
import * as manifest from '../../package.json';
import * as config from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.json',
  identity: {
    clientId: '0oa5empza950mqdtw357',
    issuer: 'https://identity.rvtr.net/oauth2/default',
    pkce: true,
    redirectUri: `${location.protocol}//${location.host}/oauth2/authorize`,
    scopes: ['openid', 'profile', 'email'],
  },
  name: 'PROD',
  production: true,
  release: `${config.defaultProject}@${manifest.version}`,
};
