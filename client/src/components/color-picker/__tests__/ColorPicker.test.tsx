import { mount } from 'enzyme';
import React from 'react';
import ColorPicker from '..';

describe('ColorPicker Unit Tests', () => {
  it('simple test', () => {
    const mockCallback = jest.fn();
    const wrapper = mount(<ColorPicker onChangeComplete={mockCallback} />);
    expect(wrapper).toMatchSnapshot();
  });
});
