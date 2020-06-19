import React from 'react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, Label } from 'recharts';
import * as TimeCore from '../../core/time';
import GraphToolTip from './GraphToolTip';

interface AnalyticsGraphProps {
  max: number;
  data: {
    count: number;
  }[];
  size: {
    height: number;
    width: number;
  };
  thumbnail: {
    height: number;
    width: number;
    url: string;
    sas: string;
  };
  name: string;
}

export default (props: AnalyticsGraphProps) => {
  return (
    <AreaChart
      width={props.size.width - 20}
      height={props.size.height * 0.5}
      data={props.data}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <YAxis
        domain={[0, 1.5 * props.max]}
        label={{
          value: props.name,
          angle: -90,
          position: 'insideLeft'
        }}
      />

      <XAxis
        tickFormatter={x => TimeCore.time2string(x + 1)}
        minTickGap={Math.round(props.data.length / 3)}
      >
        <Label value="Time" offset={0} position="insideBottom" />
      </XAxis>
      <Tooltip
        isAnimationActive={false}
        content={<GraphToolTip name={props.name} thumbnail={props.thumbnail} />}
        cursor={{ stroke: 'red', strokeWidth: 2 }}
      />
      <Area
        isAnimationActive={true}
        type="basis"
        dataKey="count"
        fillOpacity={0.5}
      />
    </AreaChart>
  );
};
