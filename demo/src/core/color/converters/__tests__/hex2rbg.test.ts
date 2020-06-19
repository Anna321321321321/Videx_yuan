import hex2rgb from '../hex2rgb';

describe('hex2color unit tests', () => {
  it('#e32990', () => {
    expect(hex2rgb('#e32990')).toEqual('rgba(227,41,144,0.2)');
  });

  it('#28a3dc', () => {
    expect(hex2rgb('#28a3dc')).toEqual('rgba(40,163,220,0.2)');
  });

  it('#9719ff', () => {
    expect(hex2rgb('#9719ff')).toEqual('rgba(151,25,255,0.2)');
  });

  it('#4cba35', () => {
    expect(hex2rgb('#4cba35')).toEqual('rgba(76,186,53,0.2)');
  });

  it('#fff110', () => {
    expect(hex2rgb('#fff110')).toEqual('rgba(255,241,16,0.2)');
  });
});
