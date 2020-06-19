import { mount } from 'enzyme';
import React, { Component } from 'react';
import CursorPosition from '..';

class Dummy extends Component<any, any> {
  render() {
    return <div>Dummy</div>;
  }
}

describe('CursorPosition Unit Tests', () => {
  it('Set className & style', () => {
    const wrapper = mount(
      <CursorPosition
        className={'test'}
        style={{
          height: '100px',
          width: '100px'
        }}
      />
    );
    expect(wrapper.props().className).toBe('test');
    expect(wrapper.props().style).toEqual({ height: '100px', width: '100px' });

    const cursorPositionDiv = wrapper.find('div');
    expect(cursorPositionDiv.length).toBe(1);
    expect(cursorPositionDiv.hasClass('test')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('Render child components', () => {
    const wrapper = mount(
      <CursorPosition
        style={{
          height: '100px',
          width: '100px'
        }}
      >
        <Dummy />
        <Dummy />
      </CursorPosition>
    );
    expect(wrapper.find('Dummy').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('Check child component props', () => {
    const wrapper = mount(
      <CursorPosition
        style={{
          height: '100px',
          width: '100px'
        }}
      >
        <Dummy />
      </CursorPosition>
    );
    expect(wrapper.find('Dummy').length).toBe(1);
    expect(wrapper.find('Dummy').get(0).props).toEqual({
      detectedEnvironment: {
        isMouseDetected: false,
        isTouchDetected: false
      },
      elementDimensions: {
        width: 0,
        height: 0
      },
      isActive: false,
      isPositionOutside: true,
      position: {
        x: 0,
        y: 0
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
