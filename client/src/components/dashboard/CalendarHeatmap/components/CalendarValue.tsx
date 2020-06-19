import { Popover } from 'antd';
import React from 'react';
import _ from 'lodash';
import 'react-calendar-heatmap/dist/styles.css';
import moment from 'moment';
import CalendarValueHOC from './CalendarValueHOC';

interface CalendarValueProps {
  index: number;
  value: {
    lessons: [];
    count: number;
    date: Date;
  };
  element: any;
  subscribers: number;
  lessonFilter: [];
}

const OverallCalendarValue = (props: CalendarValueProps) => (
  <Popover
    key={props.index}
    content={
      <span>
        Date: {props.value.date}
        <br />
        Lessons:{' '}
        <ul style={{ height: 100, overflowY: 'scroll', paddingRight: 15 }}>
          {Array.from(props.value.lessons).map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </span>
    }
  >
    <g key={props.index}>
      {React.cloneElement(props.element)}
      <text
        x={props.element.props.x}
        y={props.element.props.y + 3}
        style={{ fontSize: 3, color: '#fff' }}
      >
        {moment(props.value.date).format('DD')}
      </text>
      <text
        x={props.element.props.x}
        y={props.element.props.y + 9}
        style={{ fontSize: 3, fill: '#fff' }}
      >
        {props.value.count}/{props.subscribers}
      </text>
    </g>
  </Popover>
);

const LessonCalendarValue = (props: CalendarValueProps) => (
  <Popover
    key={props.index}
    content={
      <span>
        Date: {props.value.date}
        <br />
        Lessons:{' '}
        <ul style={{ height: 100, overflowY: 'scroll', paddingRight: 15 }}>
          {Array.from(props.value.lessons).map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </span>
    }
  >
    <g key={props.index}>
      {React.cloneElement(props.element)}
      <text
        x={props.element.props.x}
        y={props.element.props.y + 3}
        style={{ fontSize: 3, color: '#fff' }}
      >
        {moment(props.value.date).format('DD')}
      </text>
      <text
        x={props.element.props.x}
        y={props.element.props.y + 9}
        style={{ fontSize: 3, fill: '#fff' }}
      >
        {props.value.count}/{props.subscribers}
      </text>
    </g>
  </Popover>
);

export default CalendarValueHOC(OverallCalendarValue, LessonCalendarValue)();
