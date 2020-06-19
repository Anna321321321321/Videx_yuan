import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

const enhance = compose(onlyUpdateForKeys(['data']));

interface TimeMarkIndicatorProps {
  data: {
    x: number;
    y: number;
    content: string;
  }[];
}

export default enhance((props: TimeMarkIndicatorProps) => (
  <svg>
    {props.data.map((data, index) => {
      return (
        <text
          key={index}
          x={data.x}
          y={data.y}
          fill="white"
          fontSize="x-small"
          filter="url(#background)"
        >
          {data.content}
        </text>
      );
    })}
  </svg>
));
