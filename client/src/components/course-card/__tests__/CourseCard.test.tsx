import { mount } from 'enzyme';
import React from 'react';
import CourseCard from '..';

const subscribersProps = {
  name: 'PHIL101',
  metadata: {
    token: null,
    ownerAccess: false
  },
  id: '00000000-0000-0001-0000-000000000001',
  onDeleteCallback: jest.fn()
};

const adminProps = {
  name: 'PHIL101',
  metadata: {
    token: 'test',
    ownerAccess: true
  },
  id: '00000000-0000-0001-0000-000000000001',
  onDeleteCallback: jest.fn()
};

const deletedProps = {
  name: null,
  metadata: {
    token: null,
    ownerAccess: false
  },
  id: '00000000-0000-0001-0000-000000000001',
  onDeleteCallback: jest.fn()
};

describe('Course Card Unit Tests', () => {
  it('Render view of subscribers', () => {
    const wrapper = mount(<CourseCard {...subscribersProps} />);
    expect(wrapper.props()).toEqual(subscribersProps);
    expect(wrapper.find('button').length).toEqual(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render view of owner or administrator', () => {
    const wrapper = mount(<CourseCard {...adminProps} />);
    expect(wrapper.props()).toEqual(adminProps);
    expect(wrapper.find('button').length).toEqual(3);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render deleted courses', () => {
    const wrapper = mount(<CourseCard {...deletedProps} />);
    expect(wrapper.find('button').length).toEqual(0);
    expect(wrapper.find('MenuItem').length).toEqual(0);
    expect(wrapper).toMatchSnapshot();
  });
});
