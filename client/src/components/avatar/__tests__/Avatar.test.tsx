import { mount } from 'enzyme';
import React from 'react';
import Avatar from '..';

describe('Avatar Unit Tests', () => {
  it('Render Avatar', () => {
    const wrapper = mount(<Avatar name="JZ" />);
    expect(wrapper).toMatchSnapshot();
  });
});
