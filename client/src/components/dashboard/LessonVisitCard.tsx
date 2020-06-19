import { Card } from 'antd';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Label } from 'recharts';
import _ from 'lodash';

export default class LessonVisitCard extends PureComponent<any, any> {
  render() {
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
          <h2>Student Activity by Lesson</h2>
          <BarChart width={1200} height={300} data={this.props.lessonVisit}>
            <XAxis dataKey="LessonId">
              <Label value="LessonId" offset={0} position="bottom" />
            </XAxis>
            <YAxis>
              <Label value="Students" offset={0} position="left" />
            </YAxis>
            <Tooltip />
            <Bar dataKey="Lesson.View.First" fill="#82ca9d" stackId="a" />
            <Bar dataKey="Lesson.View.Revisit" fill="#8884d8" stackId="a" />
          </BarChart>
        </Card>
      </div>
    );
  }
}
