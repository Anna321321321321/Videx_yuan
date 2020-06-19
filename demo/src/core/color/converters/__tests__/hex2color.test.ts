import hex2color from '../hex2color';

describe('hex2color unit tests', () => {
  it('#e32990', () => {
    expect(hex2color('#e32990')).toEqual('red');
  });

  it('#fff110', () => {
    expect(hex2color('#fff110')).toEqual('yellow');
  });

  it('#4cba35', () => {
    expect(hex2color('#4cba35')).toEqual('green');
  });

  it('#28a3dc', () => {
    expect(hex2color('#28a3dc')).toEqual('blue');
  });

  it('#9719ff', () => {
    expect(hex2color('#9719ff')).toEqual('purple');
  });
});
