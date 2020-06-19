import React, { ReactElement } from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

const enhance = compose(
  onlyUpdateForKeys([
    'elementDimensions',
    'isActive',
    'isPositionOutside',
    'position',
    'children'
  ])
);

interface IndicatorsWrapperProps {
  isActive?: boolean;
  isPositionOutside?: boolean;
  position?: {
    x: number;
    y: number;
  };
  children: ReactElement<any>[];
  elementDimensions: {
    width: number;
    height: number;
  };
}

export default enhance((props: IndicatorsWrapperProps) => (
  <svg
    height={props.elementDimensions.height}
    width={props.elementDimensions.width}
    className="videx-indicators"
  >
    <defs>
      <filter x="0" y="0" width="1" height="1" id="background">
        <feFlood floodColor="gray" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    {React.Children.map(props.children, child => {
      if (child) {
        return React.cloneElement(child as ReactElement<any>, {
          isActive: props.isActive,
          isPositionOutside: props.isPositionOutside,
          position: props.position,
          elementDimensions: props.elementDimensions
        });
      }
    })}
  </svg>
));
