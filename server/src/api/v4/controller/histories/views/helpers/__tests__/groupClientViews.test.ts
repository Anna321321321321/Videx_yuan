import groupClientViews from '../groupClientViews';

describe('groupClientViews unit test', () => {
  it('simple test', () => {
    const input = [1, 2, 3, 4, 1, 1, 2, 3, 5];
    const output = [
      {
        start: 1,
        end: 1,
        counter: 3
      },
      {
        start: 2,
        end: 2,
        counter: 2
      },
      {
        start: 3,
        end: 3,
        counter: 2
      },
      {
        start: 4,
        end: 4,
        counter: 1
      },
      {
        start: 5,
        end: 5,
        counter: 1
      }
    ];
    expect(groupClientViews(input)).toEqual(output);
  });

  it('simple test 1', () => {
    const input = [8, 9, 10, 11];
    const output = [
      {
        start: 8,
        end: 8,
        counter: 1
      },
      {
        start: 9,
        end: 9,
        counter: 1
      },
      {
        start: 10,
        end: 10,
        counter: 1
      },
      {
        start: 11,
        end: 11,
        counter: 1
      }
    ];
    expect(groupClientViews(input)).toEqual(output);
  });

  it('simple test 2', () => {
    const input = [10, 110, 111, 112];
    const output = [
      {
        start: 10,
        end: 10,
        counter: 1
      },
      {
        start: 110,
        end: 110,
        counter: 1
      },
      {
        start: 111,
        end: 111,
        counter: 1
      },
      {
        start: 112,
        end: 112,
        counter: 1
      }
    ];
    expect(groupClientViews(input)).toEqual(output);
  });
});
