import { mount, shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedCourseLibraryContainer, {
  CourseLibraryContainer
} from '../CourseLibraryContainer';
import * as constants from '../constants';

const unInitializedProps = {
  courses: [],
  metadata: {
    adminAccess: false
  },
  initialized: false
};

const initializedProps = {
  courses: [
    {
      name: 'test1',
      metadata: {
        token: 'test',
        ownerAccess: true
      },
      id: '1'
    }
  ],
  metadata: {
    adminAccess: true
  },
  initialized: true
};

describe('Course Library Container Unit Tests', () => {
  it('Mount & Unmount component', () => {
    const mockInit = jest.fn();
    const mockDeinit = jest.fn();
    const wrapper = shallow(
      <CourseLibraryContainer
        {...unInitializedProps}
        init={mockInit}
        deinit={mockDeinit}
      />
    );
    expect(mockInit.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(mockDeinit.mock.calls.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render uninitialized component', () => {
    const mockInit = jest.fn();
    const mockDeinit = jest.fn();
    const mockDeleteCourse = jest.fn();
    const wrapper = shallow(
      <CourseLibraryContainer
        {...unInitializedProps}
        init={mockInit}
        deinit={mockDeinit}
      />
    );
    expect(wrapper.find('Spin').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render initialized component', () => {
    const mockInit = jest.fn();
    const mockDeinit = jest.fn();
    const mockDeleteCourse = jest.fn();
    const wrapper = shallow(
      <CourseLibraryContainer
        {...initializedProps}
        init={mockInit}
        deinit={mockDeinit}
      />
    );
    expect(wrapper.find('Spin').length).toBe(0);
    expect(wrapper.find('CourseSider').length).toBe(1);
    expect(wrapper.find('CourseCard').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Connected CourseLibrary Container Unit Tests with Redux Store', () => {
  const initialState = {
    [constants.NAME]: fromJS(unInitializedProps)
  };
  const mockStore = configureStore();

  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedCourseLibraryContainer store={store} />);
  });

  it('Render connected component', () => {
    expect(container.length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it('Check props matches with init state', () => {
    expect(container.prop('courses')).toEqual([]);
    expect(container.prop('metadata')).toEqual({ adminAccess: false });
    expect(container.prop('initialized')).toEqual(false);
    expect(container).toMatchSnapshot();
  });
});

describe('Connected CourseLibrary Container Unit Tests Full Render with Redux Store', () => {
  const initialState = {
    [constants.NAME]: fromJS(unInitializedProps)
  };
  const mockStore = configureStore();

  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    CourseLibraryContainer.prototype.componentDidMount = null;
    CourseLibraryContainer.prototype.componentWillUnmount = null;
    wrapper = mount(
      <Provider store={store}>
        <ConnectedCourseLibraryContainer />
      </Provider>
    );
  });

  it('Render connected component', () => {
    expect(wrapper.find('CourseLibraryContainer').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Check props matches with init state', () => {
    const component = wrapper.find('CourseLibraryContainer');
    expect(component.prop('courses')).toEqual([]);
    expect(component.prop('metadata')).toEqual({ adminAccess: false });
    expect(component.prop('initialized')).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('Check INIT action on dispatching', () => {
    let action;
    store.dispatch({
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
    action = store.getActions();
    expect(action[0].type).toBe('courses-library/INIT');
    expect(wrapper).toMatchSnapshot();
  });

  it('Check DEINIT action on dispatching', () => {
    let action;
    store.dispatch({
      type: 'courses-library/DEINIT'
    });
    action = store.getActions();
    expect(action[0].type).toBe('courses-library/DEINIT');
    expect(wrapper).toMatchSnapshot();
  });
});
