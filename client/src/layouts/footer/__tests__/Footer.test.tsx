import { mount } from 'enzyme';
import React from 'react';
import Footer from '..';

describe('Footer Unit Tests', () => {
  it('Render footer', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
