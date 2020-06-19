import { LocalStorageKeys } from './keys';

export default (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};
