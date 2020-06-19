import moment from 'moment';
import React from 'react';
import { branch, compose, onlyUpdateForKeys, renderNothing } from 'recompose';
import * as FilmstripCore from '../../core/filmstrip';

const enhance = compose(
  onlyUpdateForKeys([
    'height',
    'height',
    'segment',
    'isPositionOutside',
    'position'
  ]),
  branch(props => props.isPositionOutside, renderNothing)
);

interface CursorIndicatorProps {
  width: number;
  height: number;
  segment: {
    start: number;
    end: number;
  };
  position?: {
    x: number;
    y: number;
  };
}

export default enhance((props: CursorIndicatorProps) => (
  <svg>
    <rect
      x={props.position.x - 1.5}
      y={0}
      width={3}
      height={props.height}
      fill="red"
      opacity={0.6}
      style={{ zIndex: 2 }}
    />
    <text
      x={Math.min(props.position.x, props.width - 50) + 5}
      y={props.height * 0.25}
      fill="white"
      fontSize="small"
      filter="url(#background)"
    >
      {moment('2000-01-01 00:00:00')
        .startOf('day')
        .seconds(
          FilmstripCore.helpers.pixels2timestamp(
            props.position.x,
            props.segment,
            props.width
          )
        )
        .format('HH:mm:ss')}
    </text>
  </svg>
));
