import { shallow } from 'enzyme';
import React from 'react';
import Header from '..';

describe('Header Layout Unit Tests', () => {
  it('Render component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
