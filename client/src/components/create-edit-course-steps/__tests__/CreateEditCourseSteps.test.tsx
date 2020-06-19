import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import CreateEditCourseSteps from '../';

describe('Create Edit Course Steps Unit Tests: Create', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreateEditCourseSteps mode="create" />);
  });

  it('Step 0', () => {
    expect(wrapper.find('Step').length).toBe(3);
    expect(wrapper).toMatchSnapshot();
  });

  it('Step 1', () => {
    wrapper.setState({
      fields: {
        name: {
          value: 'test'
        },
        releaseDate: {
          value: moment('1970-01-01 16:00Z')
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Step 2: No Loading', () => {
    wrapper.setState({
      current: 1,
      fields: {
        name: {
          value: 'test'
        },
        releaseDate: {
          value: moment('1970-01-01 16:00Z')
        }
      }
    });
    expect(wrapper.find('Button').length).toBe(2);
    expect(
      wrapper
        .find('Button')
        .at(0)
        .prop('loading')
    ).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('Step 2: Loading', () => {
    wrapper.setState({
      current: 1,
      fields: {
        name: {
          value: 'test'
        },
        releaseDate: {
          value: moment('1970-01-01 16:00Z')
        }
      },
      loading: true
    });
    expect(wrapper.find('Button').length).toBe(2);
    expect(
      wrapper
        .find('Button')
        .at(0)
        .prop('loading')
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('Step 3: No Error', () => {
    wrapper.setState({
      current: 2,
      fields: {
        name: {
          value: 'test'
        },
        releaseDate: {
          value: moment('1970-01-01 16:00Z')
        }
      },
      status: 'finish'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Step 3: Error', () => {
    wrapper.setState({
      current: 2,
      fields: {
        name: {
          value: 'test'
        },
        releaseDate: {
          value: moment('1970-01-01 16:00Z')
        }
      },
      status: 'error'
    });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Create Edit Course Steps Unit Tests: Edit', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CreateEditCourseSteps
        mode="edit"
        id="id"
        name="name"
        releaseDate="1970-01-01 16:00Z"
      />
    );
  });

  it('Check States', () => {
    expect(wrapper.state('fields')).toEqual({
      name: {
        value: 'name'
      },
      releaseDate: {
        value: moment('1970-01-01 16:00Z')
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
