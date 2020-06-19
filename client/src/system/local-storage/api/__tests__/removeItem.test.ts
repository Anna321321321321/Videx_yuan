import getItem from '../getItem';
import { LocalStorageKeys } from '../keys';
import removeItem from '../removeItem';

describe('removeItem unit tests', () => {
  it('remove empty', () => {
    expect(getItem(LocalStorageKeys.VERSION)).toBe(null);
    removeItem(LocalStorageKeys.VERSION);
    expect(getItem(LocalStorageKeys.VERSION)).toBe(null);
  });

  it('remove none empty', () => {
    expect(getItem(LocalStorageKeys.VERSION, '1.0.0')).toBe('1.0.0');
    removeItem(LocalStorageKeys.VERSION);
    expect(getItem(LocalStorageKeys.VERSION)).toBe(null);
  });
});
