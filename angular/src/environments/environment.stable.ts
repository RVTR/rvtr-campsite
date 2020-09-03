import * as manifest from '../../package.json';

export const environment = {
  config: 'app.config.json',
  name: 'PROD',
  production: true,
  release: `rvtr-app-campsite@${manifest.version}`,
};
