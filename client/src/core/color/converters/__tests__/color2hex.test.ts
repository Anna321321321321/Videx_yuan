import color2hex from '../color2hex';

describe('color2hex unit tests', () => {
  it('red', () => {
    expect(color2hex('red')).toEqual('#e32990');
  });

  it('yellow', () => {
    expect(color2hex('yellow')).toEqual('#fff110');
  });

  it('green', () => {
    expect(color2hex('green')).toEqual('#4cba35');
  });

  it('blue', () => {
    expect(color2hex('blue')).toEqual('#28a3dc');
  });

  it('purple', () => {
    expect(color2hex('purple')).toEqual('#9719ff');
  });
});
