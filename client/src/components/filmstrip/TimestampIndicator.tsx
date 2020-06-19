import React from 'react';
import { branch, compose, onlyUpdateForKeys, renderNothing } from 'recompose';

const enhance = compose(
  onlyUpdateForKeys(['height', 'pixels']),
  branch(props => props.pixels === null, renderNothing)
);

interface TimestampIndicatorProps {
  height: number;
  pixels: number;
}

export default enhance((props: TimestampIndicatorProps) => (
  <rect
    x={props.pixels - 1.5}
    y={0}
    width={3}
    height={props.height}
    fill="#2196f3"
    opacity={0.7}
  />
));
