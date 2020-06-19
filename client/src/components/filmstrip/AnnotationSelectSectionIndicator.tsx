import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

const enhance = compose(onlyUpdateForKeys(['start', 'width', 'height']));

interface AnnotationSelectSectionIndicatorProps {
  start: number;
  width: number;
  height: number;
}

export default enhance((props: AnnotationSelectSectionIndicatorProps) => (
  <rect
    x={props.start}
    y={0}
    width={props.width}
    height={props.height}
    fill="blue"
    opacity={0.3}
  />
));
