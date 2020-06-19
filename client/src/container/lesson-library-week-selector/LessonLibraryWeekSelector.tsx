import { Select } from 'antd';
import React from 'react';

type WeekSelectorProps = {
  weeks: string[];
  onChange: (value: string) => void;
};

export default (props: WeekSelectorProps) => (
    <div style={{display: "flex"}}>
    <span style={{margin: "auto",
                  padding: 5}}> Week:</span>
    <Select
      defaultValue={null}
      style={{ width: 100,
               margin: "auto",
               padding: 5}}
      onChange={props.onChange}
    >
      <Select.Option value={null}>All</Select.Option>
      {props.weeks.map(week => (
        <Select.Option value={week} key={week}>
          {`Week ${week}`}
        </Select.Option>
      ))}
    </Select>
    </div>
);
