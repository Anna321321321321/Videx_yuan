import moment from 'moment';
import React from 'react';
import { branch, compose, onlyUpdateForKeys, renderNothing } from 'recompose';
import * as FilmstripCore from '../../core/filmstrip';

const enhance = compose(
  onlyUpdateForKeys([
    'elementDimensions',
    'segment',
    'isPositionOutside',
    'position'
  ]),
  branch(props => props.isPositionOutside, renderNothing)
);

interface CursorIndicatorProps {
  segment: {
    start: number;
    end: number;
  };
  position?: {
    x: number;
    y: number;
  };
  elementDimensions: {
    width: number;
    height: number;
  };
}

export default enhance((props: CursorIndicatorProps) => {
  return (
    <svg className="videx-indicators">
      <rect
        x={props.position.x}
        y={0}
        width={3}
        height={props.elementDimensions.height}
        fill="red"
        opacity={0.6}
      />
      <text
        x={Math.min(props.position.x, props.elementDimensions.width) + 5}
        y={props.elementDimensions.height * 0.25}
        fill="white"
        fontSize="x-small"
        filter="url(#background)"
      >
        {moment('2000-01-01 00:00:00')
          .startOf('day')
          .seconds(
            FilmstripCore.helpers.pixels2timestamp(
              props.position.x,
              props.segment,
              props.elementDimensions.width
            )
          )
          .format('HH:mm:ss')}
      </text>
    </svg>
  );
});
