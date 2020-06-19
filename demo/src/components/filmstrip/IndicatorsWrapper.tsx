import React, { ReactElement } from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

const enhance = compose(
  onlyUpdateForKeys([
    'height',
    'width',
    'isActive',
    'isPositionOutside',
    'position',
    'children'
  ])
);

interface IndicatorsWrapperProps {
  height: number;
  width: number;
  isActive?: boolean;
  isPositionOutside?: boolean;
  position?: {
    x: number;
    y: number;
  };
  children: ReactElement<any>[];
}

export default enhance((props: IndicatorsWrapperProps) => (
  <svg height={props.height} width={props.width} className="videx-indicators">
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
          position: props.position
        });
      }
    })}
  </svg>
));
