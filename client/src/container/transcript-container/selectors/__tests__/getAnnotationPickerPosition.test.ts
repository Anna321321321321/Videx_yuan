import { getToolPosition } from '../getToolPosition';

const transcript = [
  {
    range: {
      start: 0,
      end: 9
    },
    data: [
      {
        range: {
          start: 0,
          end: 3
        }
      },
      {
        range: {
          start: 3,
          end: 9
        }
      }
    ]
  },
  {
    range: {
      start: 9,
      end: 18
    },
    data: [
      {
        range: {
          start: 9,
          end: 12
        }
      },
      {
        range: {
          start: 12,
          end: 18
        }
      }
    ]
  }
];

describe('getAnnotationPickerPosition unit test', () => {
  it('simple test 1', () => {
    const result = null;
    expect(
      getToolPosition(transcript, 'end', { start: 0, end: 2 }, 'filmstrip')
    ).toEqual(result);
  });
});
