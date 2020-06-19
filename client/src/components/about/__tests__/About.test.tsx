import { mount } from 'enzyme';
import React from 'react';
import About from '..';

describe('About Unit Tests', () => {
  it('simple test', () => {
    const wrapper = mount(<About />);
    expect(wrapper).toMatchSnapshot();
  });
});
