import compareVersion from '../compareVersion';

describe('compareVersion Unit Tests', () => {
  it('simple test 1', () => {
    const v1 = '1.0.0';
    const v2 = '2.0.0';
    expect(compareVersion(v1, v2)).toEqual(true);
  });

  it('simple test 2', () => {
    const v1 = '1.0.0';
    const v2 = '1.1.0';
    expect(compareVersion(v1, v2)).toEqual(true);
  });

  it('simple test 3', () => {
    const v1 = '1.0.0';
    const v2 = '1.0.1';
    expect(compareVersion(v1, v2)).toEqual(true);
  });

  it('simple test 4', () => {
    const v1 = '1.0.0';
    const v2 = '1.0.0';
    expect(compareVersion(v1, v2)).toEqual(false);
  });

  it('simple test 5', () => {
    const v1 = '2.0.0';
    const v2 = '1.0.0';
    expect(compareVersion(v1, v2)).toEqual(false);
  });

  it('simple test 6', () => {
    const v1 = '1.1.0';
    const v2 = '1.0.0';
    expect(compareVersion(v1, v2)).toEqual(false);
  });

  it('simple test 7', () => {
    const v1 = '1.0.1';
    const v2 = '1.0.0';
    expect(compareVersion(v1, v2)).toEqual(false);
  });
});
