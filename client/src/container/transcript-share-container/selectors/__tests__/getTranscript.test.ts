import { getTranscript } from '../getTranscript';
import { fromJS } from 'immutable';

describe('getTranscript unit test', () => {
  it('simple test', () => {
    const input = [{ start: 0, end: 9, text: 'abc def ghi' }];
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
            color: '#7c7b7b',
            fontWeight: 'normal',
            background: null
          },
          {
            text: 'def',
            range: {
              start: 3,
              end: 6
            },
            color: '#7c7b7b',
            fontWeight: 'normal',
            background: null
          },
          {
            text: 'ghi',
            range: {
              start: 6,
              end: 9
            },
            color: '#7c7b7b',
            fontWeight: 'normal',
            background: null
          }
        ]
      }
    ]);
    expect(getTranscript(input)).toEqual(result);
  });
});
