import { Environment } from '../environment';
import * as manifest from '../../package.json';
import * as config from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.json',
  name: 'PROD',
  production: true,
  release: `${config.defaultProject}@${manifest.version}`,
};
