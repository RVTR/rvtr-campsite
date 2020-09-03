import { Link } from './link.model';

/**
 * Represents the _Config_ model
 *
 * ```yaml
 * api: object;
 * navigation: object;
 * ```
 */
export interface Config {
  api: {
    account: {
      base: string;
      uri: {
        account: string;
        address: string;
        profile: string;
        payment: string;
      };
    };
    booking: {
      base: string;
      uri: {
        booking: string;
      };
    };
    lodging: {
      base: string;
      uri: {
        lodging: string;
        rental: string;
        review: string;
      };
    };
    monitoring: string;
  };
  navigation: {
    footer: Link[];
    header: Link[];
  };
}
