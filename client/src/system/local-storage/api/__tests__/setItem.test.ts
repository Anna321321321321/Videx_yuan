import getItem from '../getItem';
import { LocalStorageKeys } from '../keys';
import setItem from '../setItem';

describe('setItem unit tests', () => {
  it('simple test', () => {
    expect(getItem(LocalStorageKeys.VERSION)).toBe(null);
    setItem(LocalStorageKeys.VERSION, '1.0.0');
    expect(getItem(LocalStorageKeys.VERSION)).toBe('1.0.0');
  });
});
