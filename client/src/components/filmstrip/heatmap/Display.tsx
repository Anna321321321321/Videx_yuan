import React from 'react';
import { Area, AreaChart, YAxis } from 'recharts';
import { compose, onlyUpdateForKeys } from 'recompose';

const enhance = compose(
  onlyUpdateForKeys(['color', 'width', 'height', 'input'])
);

interface DisplayProps {
  color: string;
  height: number;
  width: number;
  input: {
    max: number;
    data: {
      count: number;
    }[];
  };
}

export default enhance(
  (props: DisplayProps) =>
    props.input && (
      <div className="videx-filmstrip-heatmap">
        <AreaChart
          width={props.width}
          height={props.height}
          data={props.input.data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <YAxis hide={true} type="number" domain={[0, props.input.max]} />
          <Area
            isAnimationActive={false}
            type="basis"
            dataKey="count"
            stroke={props.color}
            fill={props.color}
            fillOpacity={0.5}
          />
        </AreaChart>
      </div>
    )
);
