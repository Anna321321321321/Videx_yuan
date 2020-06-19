import { LocalStorageKeys } from './keys';

export default (key: LocalStorageKeys, defaultValue?: any) => {
  const value = localStorage.getItem(key);
  if (!value) {
    if (defaultValue) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } else {
      return null;
    }
  } else {
    return JSON.parse(value);
  }
};
