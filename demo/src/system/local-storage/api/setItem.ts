import { LocalStorageKeys } from './keys';

export default (key: LocalStorageKeys, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
