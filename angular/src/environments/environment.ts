import { Environment } from '../environment';
import * as manifest from '../../package.json';
import * as config from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.local.json',
  name: '',
  production: false,
  release: `${config.defaultProject}@${manifest.version}`,
};
