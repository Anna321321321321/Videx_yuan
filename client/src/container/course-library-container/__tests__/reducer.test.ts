import { fromJS } from 'immutable';
import { reducer } from '../reducer';

const unInitializedStates = fromJS({
  courses: [],
  metadata: {
    adminAccess: false
  },
  initialized: false
});

const initializedStates = fromJS({
  courses: [
    {
      name: 'test1',
      metadata: {
        contributorAccess: true,
        ownerAccess: true
      },
      id: '1'
    }
  ],
  metadata: {
    adminAccess: true
  },
  initialized: true
});

describe('User reducer unit test', () => {
  it('INIT', () => {
    let state = unInitializedStates;
    state = reducer(state, {
      type: 'courses-library/INIT',
      payload: {
        courses: [
          {
            name: 'test1',
            metadata: {
              contributorAccess: true,
              ownerAccess: true
            },
            id: '1'
          }
        ],
        metadata: {
          adminAccess: true
        }
      }
    });
    expect(state).toEqual(initializedStates);
    expect(state).toMatchSnapshot();
  });

  it('DEINIT', () => {
    let state = initializedStates;
    state = reducer(state, {
      type: 'courses-library/DEINIT'
    });
    expect(state).toEqual(unInitializedStates);
    expect(state).toMatchSnapshot();
  });
});
