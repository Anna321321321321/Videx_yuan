import { shallow } from 'enzyme';
import React from 'react';
import CourseSider from '..';

const courses = [
  {
    name: 'test1',
    id: '1'
  },
  {
    name: null,
    id: '2'
  }
];

describe('CourseSider Unit Tests', () => {
  it('Render view of student', () => {
    const wrapper = shallow(
      <CourseSider courses={courses} adminAccess={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Render view of teacher', () => {
    const wrapper = shallow(
      <CourseSider courses={courses} adminAccess={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
