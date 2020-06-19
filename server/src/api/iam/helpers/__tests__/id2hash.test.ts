import id2hash from '../id2hash';

describe('id2hash unit tests', () => {
  it('simple test', () => {
    expect(id2hash('1', '0')).toBe(
      '4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5'
    );
    expect(id2hash('0', '1')).toBe(
      '938db8c9f82c8cb58d3f3ef4fd250036a48d26a712753d2fde5abd03a85cabf4'
    );
    expect(id2hash('0', '2')).toBe(
      'a953f09a1b6b6725b81956e9ad0b1eb49e3ad40004c04307ef8af6246a054116'
    );
    expect(id2hash('2', '0')).toBe(
      'f5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b'
    );
    expect(id2hash('ABD', 'LADEF')).toBe(
      '52193eb6c10f158d5efdc4eaa9caebf770179cb1a773116fae26a570801510cf'
    );
    expect(id2hash('ABDL', 'ADEF')).toBe(
      '52193eb6c10f158d5efdc4eaa9caebf770179cb1a773116fae26a570801510cf'
    );
  });
});
