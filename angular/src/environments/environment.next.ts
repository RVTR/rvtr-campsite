import { Environment } from '../environment';
import * as manifest from '../../package.json';
import * as config from '../../angular.json';

export const environment: Environment = {
  config: 'app.config.json',
  name: 'DEV',
  production: true,
  release: `${config.defaultProject}@${manifest.version}`,
};
