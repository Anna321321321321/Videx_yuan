import React, { ReactElement } from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';

const enhance = compose(
  onlyUpdateForKeys([
    'isActive',
    'isPositionOutside',
    'position',
    'children',
    'elementDimensions',
    'segment'
  ])
);

interface EventWrapperProps {
  segment: {
    start: number;
    end: number;
  };
  isActive?: boolean;
  isPositionOutside?: boolean;
  position?: {
    x: number;
    y: number;
  };
  children: ReactElement<any>[];
  detectedEnvironment: {
    isTouchDetected: boolean;
    isMouseDetected: boolean;
  };
  elementDimensions: {
    width: number;
    height: number;
  };
}

export default enhance((props: EventWrapperProps) => (
  <div>
    {React.Children.map(props.children, child =>
      React.cloneElement(child as ReactElement<any>, {
        isActive: props.isActive,
        isPositionOutside: props.isPositionOutside,
        position: props.position,
        elementDimensions: props.elementDimensions
      })
    )}
  </div>
));
