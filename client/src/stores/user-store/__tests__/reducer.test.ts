import { fromJS } from 'immutable';
import reducer from '../reducer';

describe('User reducer unit test', () => {
  it('INIT', () => {
    let state = fromJS({
      id: null,
      name: null,
      email: null,
      type: null,
      initialized: false
    });
    state = reducer(state, {
      type: 'user-store/INIT',
      payload: {
        id: '46bf1e47-bd1f-40a8-b7b3-8f8781c04077',
        name: 'Teacher One',
        email: 'teacher1@videxint.onmicrosoft.com',
        type: 1
      }
    });
    const expectResult = fromJS({
      id: '46bf1e47-bd1f-40a8-b7b3-8f8781c04077',
      name: 'Teacher One',
      email: 'teacher1@videxint.onmicrosoft.com',
      type: 1,
      initialized: true
    });
    expect(state).toEqual(expectResult);
    expect(state).toMatchSnapshot();
  });
});
