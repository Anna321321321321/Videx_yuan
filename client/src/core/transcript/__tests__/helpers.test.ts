import { divider } from '../helpers';

describe('divider unit test', () => {
  it('simple test 1', () => {
    const transcript = {
      text: 'abc def ghi',
      range: {
        start: 0,
        end: 9
      }
    };
    const range = {
      start: 1,
      end: 4
    };
    const fn = jest.fn();
    fn.mockImplementation(value => value);

    const output = [
      {
        text: 'abc def',
        range: {
          start: 0,
          end: 6
        }
      },
      {
        text: 'ghi',
        range: {
          start: 6,
          end: 9
        }
      }
    ];
    expect(divider(transcript, range, fn)).toEqual(output);
  });

  it('simple test 2', () => {
    const transcript = {
      text: 'abc def ghi',
      range: {
        start: 0,
        end: 9
      }
    };
    const range = {
      start: 0,
      end: 2
    };
    const fn = jest.fn();
    fn.mockImplementation(value => value);

    const output = [
      {
        text: 'abc',
        range: {
          start: 0,
          end: 3
        }
      },
      {
        text: 'def ghi',
        range: {
          start: 3,
          end: 9
        }
      }
    ];
    expect(divider(transcript, range, fn)).toEqual(output);
  });

  it('simple test 3', () => {
    const transcript = {
      text: 'abc def ghi',
      range: {
        start: 0,
        end: 9
      }
    };
    const range = {
      start: 1,
      end: 8
    };
    const fn = jest.fn();
    fn.mockImplementation(value => value);

    const output = [
      {
        text: 'abc def ghi',
        range: {
          start: 0,
          end: 9
        }
      }
    ];
    expect(divider(transcript, range, fn)).toEqual(output);
  });

  it('simple test 4', () => {
    const transcript = {
      text: 'abc def ghi',
      range: {
        start: 0,
        end: 9
      }
    };
    const range = {
      start: -1,
      end: 11
    };
    const fn = jest.fn();
    fn.mockImplementation(value => value);

    const output = [
      {
        text: 'abc def ghi',
        range: {
          start: 0,
          end: 9
        }
      }
    ];
    expect(divider(transcript, range, fn)).toEqual(output);
  });

  it('simple test 5', () => {
    const transcript = {
      text: 'abc def ghi',
      range: {
        start: 0,
        end: 9
      }
    };
    const range = {
      start: 3,
      end: 12
    };
    const fn = jest.fn();
    fn.mockImplementation(value => value);

    const output = [
      {
        text: 'abc',
        range: {
          start: 0,
          end: 3
        }
      },
      {
        text: 'def ghi',
        range: {
          start: 3,
          end: 9
        }
      }
    ];
    expect(divider(transcript, range, fn)).toEqual(output);
  });

  it('simple test 6', () => {
    const transcript = {
      text: 'abc def ghi',
      range: {
        start: 0,
        end: 9
      }
    };
    const range = {
      start: -10,
      end: 4
    };
    const fn = jest.fn();
    fn.mockImplementation(value => value);

    const output = [
      {
        text: 'abc def',
        range: {
          start: 0,
          end: 6
        }
      },
      {
        text: 'ghi',
        range: {
          start: 6,
          end: 9
        }
      }
    ];
    expect(divider(transcript, range, fn)).toEqual(output);
  });
});
