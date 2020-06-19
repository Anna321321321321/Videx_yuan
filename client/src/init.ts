import * as LocalStorage from './system/local-storage';
import * as Notification from './system/notification';

export default () => {
  const version = LocalStorage.getItem(LocalStorage.LocalStorageKeys.VERSION);
  // display notification
  Notification.init(version);
  // VIDEX_VERSION will be injected by webpack
  if (version) {
    // @ts-ignore
    if (version !== VIDEX_VERSION) {
      // @ts-ignore
      LocalStorage.setItem(
        LocalStorage.LocalStorageKeys.VERSION,
        // @ts-ignore
        VIDEX_VERSION
      );
    }
  } else {
    // @ts-ignore
    LocalStorage.setItem(LocalStorage.LocalStorageKeys.VERSION, VIDEX_VERSION);
  }
};
