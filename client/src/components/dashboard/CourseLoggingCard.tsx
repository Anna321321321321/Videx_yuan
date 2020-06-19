import { Card } from 'antd';
import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from 'recharts';
import moment from 'moment';

// TODO: https://github.com/OneNoteDev/ViDeX/issues/914
export interface CourseCardProps {
  courseLoggingHistory: {
    columns: [];
    rows: [];
  };
}

export default class CourseLoggingCard extends PureComponent<any, any> {
  render() {
    const data = this.props.courseLoggingHistory.rows.map(item => {
      return {
        Day: moment(item[1])
          .utc()
          .format('MMM Do, ddd'),
        Students: item[2]
      };
    });
    return (
      <div
        style={{
          position: 'relative',
          marginBottom: '20px'
        }}
      >
        <Card
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h2>Student Logging throughout time</h2>
          <BarChart width={1200} height={300} data={data}>
            <XAxis dataKey="Day">
              <Label value="Days" offset={0} position="bottom" />
            </XAxis>
            <YAxis>
              <Label value="Students" offset={0} position="left" />
            </YAxis>
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="Students" fill="#8884d8" />
          </BarChart>
        </Card>
      </div>
    );
  }
}
