import mergeViews from '../mergeViews';

describe('mergeViews unit test', () => {
  it('simple test', () => {
    const pre = [];
    const next = [];
    const result = [];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('simple test 1', () => {
    const pre = [
      {
        start: 1,
        end: 2,
        counter: 1
      }
    ];
    const next = [];
    const result = [
      {
        start: 1,
        end: 2,
        counter: 1
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('simple test 2', () => {
    const pre = [];
    const next = [
      {
        start: 1,
        end: 2,
        counter: 1
      }
    ];
    const result = [
      {
        start: 1,
        end: 2,
        counter: 1
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('no merge', () => {
    const pre = [
      {
        start: 0,
        end: 1,
        counter: 5
      }
    ];
    const next = [
      {
        start: 2,
        end: 3,
        counter: 1
      }
    ];
    const result = [
      {
        start: 0,
        end: 1,
        counter: 5
      },
      {
        start: 2,
        end: 3,
        counter: 1
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge at begining', () => {
    const pre = [
      {
        start: 0,
        end: 5,
        counter: 5
      }
    ];
    const next = [
      {
        start: 0,
        end: 2,
        counter: 1
      }
    ];
    const result = [
      {
        start: 0,
        end: 2,
        counter: 6
      },
      {
        start: 3,
        end: 5,
        counter: 5
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge at end', () => {
    const pre = [
      {
        start: 0,
        end: 5,
        counter: 5
      }
    ];
    const next = [
      {
        start: 3,
        end: 5,
        counter: 1
      }
    ];
    const result = [
      {
        start: 0,
        end: 2,
        counter: 5
      },
      {
        start: 3,
        end: 5,
        counter: 6
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge start & end', () => {
    const pre = [
      {
        start: 0,
        end: 5,
        counter: 5
      }
    ];
    const next = [
      {
        start: 0,
        end: 5,
        counter: 2
      }
    ];
    const result = [
      {
        start: 0,
        end: 5,
        counter: 7
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge in between', () => {
    const pre = [
      {
        start: 0,
        end: 5,
        counter: 5
      }
    ];
    const next = [
      {
        start: 1,
        end: 4,
        counter: 2
      }
    ];
    const result = [
      {
        start: 0,
        end: 0,
        counter: 5
      },
      {
        start: 1,
        end: 4,
        counter: 7
      },
      {
        start: 5,
        end: 5,
        counter: 5
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge beyond', () => {
    const pre = [
      {
        start: 2,
        end: 7,
        counter: 5
      }
    ];
    const next = [
      {
        start: 0,
        end: 9,
        counter: 2
      }
    ];
    const result = [
      {
        start: 0,
        end: 1,
        counter: 2
      },
      {
        start: 2,
        end: 7,
        counter: 7
      },
      {
        start: 8,
        end: 9,
        counter: 2
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge 1', () => {
    const pre = [
      {
        start: 0,
        end: 5,
        counter: 1
      }
    ];
    const next = [
      {
        start: 6,
        end: 10,
        counter: 1
      }
    ];
    const result = [
      {
        start: 0,
        end: 10,
        counter: 1
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });

  it('merge 2', () => {
    const pre = [
      {
        start: 0,
        end: 20,
        counter: 1
      }
    ];
    const next = [
      {
        start: 100,
        end: 120,
        counter: 1
      }
    ];
    const result = [
      {
        start: 0,
        end: 20,
        counter: 1
      },
      {
        start: 100,
        end: 120,
        counter: 1
      }
    ];
    expect(mergeViews(pre, next)).toEqual(result);
  });
});
