import { shallow } from 'enzyme';
import React from 'react';
import CourseLibraryPage from '..';

describe('CourseLibraryPage Unit Tests', () => {
  it('Shallow Render', () => {
    const wrapper = shallow(<CourseLibraryPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
