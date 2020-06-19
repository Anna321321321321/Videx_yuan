import { fromJS } from 'immutable';
import { mergeTranscriptTimestamp } from '../mergeTranscriptTimestamp';

describe('mergeTranscriptTimestamp unit test', () => {
  it('simple test 1', () => {
    const transcript = fromJS([
      {
        range: {
          start: 0,
          end: 9
        },
        words: [
          {
            text: 'abc',
            range: {
              start: 0,
              end: 3
            },
            color: '#a6a6a6',
            background: null
          },
          {
            text: 'def',
            range: {
              start: 3,
              end: 6
            },
            color: '#a6a6a6',
            background: null
          },
          {
            text: 'ghi',
            range: {
              start: 6,
              end: 9
            },
            color: '#a6a6a6',
            background: null
          }
        ]
      },
      {
        range: {
          start: 9,
          end: 18
        },
        words: [
          {
            text: 'jkl',
            range: {
              start: 9,
              end: 12
            },
            color: '#a6a6a6',
            background: null
          },
          {
            text: 'mno',
            range: {
              start: 12,
              end: 15
            },
            color: '#a6a6a6',
            background: null
          },
          {
            text: 'pqr',
            range: {
              start: 15,
              end: 18
            },
            color: '#a6a6a6',
            background: null
          }
        ]
      }
    ]);
    const timestamp = 1;
    const result = fromJS([
      {
        range: {
          start: 0,
          end: 9
        },
        words: [
          {
            text: 'abc',
            range: {
              start: 0,
              end: 3
            },
            color: '#212121',
            background: null
          },
          {
            text: 'def',
            range: {
              start: 3,
              end: 6
            },
            color: '#212121',
            background: null
          },
          {
            text: 'ghi',
            range: {
              start: 6,
              end: 9
            },
            color: '#212121',
            background: null
          }
        ]
      },
      {
        range: {
          start: 9,
          end: 18
        },
        words: [
          {
            text: 'jkl',
            range: {
              start: 9,
              end: 12
            },
            color: '#a6a6a6',
            background: null
          },
          {
            text: 'mno',
            range: {
              start: 12,
              end: 15
            },
            color: '#a6a6a6',
            background: null
          },
          {
            text: 'pqr',
            range: {
              start: 15,
              end: 18
            },
            color: '#a6a6a6',
            background: null
          }
        ]
      }
    ]);
    expect(mergeTranscriptTimestamp(transcript, timestamp, 400)).toEqual(
      result
    );
  });
});
