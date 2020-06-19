import React from 'react';
import { mount } from 'enzyme';
import OpenVideoButton from '..';

describe('OpenVideoButton Unit Tests', () => {
  it('When active button clicked, will open course video', () => {
    // setup
    const mockedOpen = jest.fn();
    const originalOpen = window.open;
    window.open = mockedOpen;
    const wrapper = mount(
      <OpenVideoButton
        courseId={'courseId'}
        lessonId={'lessonId'}
        start={0}
        end={100}
      />
    );

    // tests
    const button = wrapper.find('Button');
    button.simulate('click');
    expect(mockedOpen).toBeCalled();

    // cleanup
    window.open = originalOpen;

    expect(wrapper).toMatchSnapshot();
  });
});
