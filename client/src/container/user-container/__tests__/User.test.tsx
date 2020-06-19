import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { UserContainer } from '../UserContainer';

describe('User Component Unit Tests', () => {
  it('Initialize component', () => {
    const mockInit = jest.fn();
    const wrapper = shallow(
      <UserContainer
        id={null}
        name={null}
        email={null}
        type={null}
        initialized={false}
        init={mockInit}
      />
    );
    expect(mockInit.mock.calls.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('After initialized', () => {
    const mockInit = jest.fn();
    const wrapper = shallow(
      <UserContainer
        id="46bf1e47-bd1f-40a8-b7b3-8f8781c04077"
        name="Teacher One"
        email="teacher1@videxint.onmicrosoft.com"
        type={1}
        initialized={true}
        init={mockInit}
      />
    );
    expect(mockInit.mock.calls.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });
});
