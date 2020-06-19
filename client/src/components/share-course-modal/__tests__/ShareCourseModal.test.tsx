import { mount } from 'enzyme';
import React from 'react';
import ShareCourseModal from '..';

describe('ShareCourseModal Unit Tests', () => {
  it('Invisible', () => {
    const wrapper = mount(
      <ShareCourseModal link={null} visible={false} onCloseModal={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Visible link is null', () => {
    const wrapper = mount(
      <ShareCourseModal link={null} visible={true} onCloseModal={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Visible link is not null', () => {
    const wrapper = mount(
      <ShareCourseModal link={'1'} visible={true} onCloseModal={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
