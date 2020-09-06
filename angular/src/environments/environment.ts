import { Environment } from './types/environment.type';
import * as manifest from '../../package.json';
import * as config from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.local.json',
  identity: {
    clientId: '0oa5empza950mqdtw357',
    issuer: 'https://identity.rvtr.net/oauth2/default',
    pkce: true,
    redirectUri: `${location.protocol}//${location.host}/oauth2/authorize`,
    scopes: ['openid', 'profile', 'email'],
  },
  name: '',
  production: false,
  release: `${config.defaultProject}@${manifest.version}`,
};
