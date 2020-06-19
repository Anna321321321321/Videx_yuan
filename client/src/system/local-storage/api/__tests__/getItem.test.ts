import getItem from '../getItem';
import { LocalStorageKeys } from '../keys';

describe('getItem unit tests', () => {
  it('return null', () => {
    const value = getItem(LocalStorageKeys.VERSION);
    expect(value).toBe(null);
  });

  it('set default', () => {
    const value = getItem(LocalStorageKeys.VERSION, '1.0.0');
    expect(value).toBe('1.0.0');
  });

  it('read after set default', () => {
    const value = getItem(LocalStorageKeys.VERSION);
    expect(value).toBe('1.0.0');
  });
});
