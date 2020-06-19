import * as LocalStorage from '../local-storage';
import notify from './notify';

export default (version: string) => {
  if (version) {
    notify(version);
  }
};
