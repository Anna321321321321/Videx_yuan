import { Grid } from 'semantic-ui-react';
import React, { Fragment } from 'react';
import _ from 'lodash';
import 'react-calendar-heatmap/dist/styles.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment';
import 'react-calendar-heatmap/dist/styles.css';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import CalendarValueHOC from './components/CalendarValue';
import { Spin } from 'antd';

export interface SessionsCalendarHeatmapInterface {
  calendarStartDate: Date;
  calendarEndDate: Date;
  values: {
    date: string;
    count: number;
    lessons?: string;
  }[];
  subscribers: number;
  lessonFilter: any;
}

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const element1: HTMLCollection = document.getElementsByClassName(
        'react-calendar-heatmap-small-text react-calendar-heatmap-weekday-label'
      );
      if (element1.length > 0) {
        for (let i = 0; i < element1.length; i++) {
          const newX = parseInt(element1[i].getAttribute('x')) - 11;
          element1[i].setAttribute('x', newX.toString());
        }
      }
    }
  }),
  branch(props => props.calendarStartDate === null, renderComponent(Spin))
);

export default enhance((props: SessionsCalendarHeatmapInterface) => {
  const { calendarStartDate } = props;
  const calendarDatesArray = [];

  if (calendarStartDate !== null) {
    for (let i = 1; i < 5; i++) {
      calendarDatesArray.push({
        start: new Date(
          Date.UTC(
            calendarStartDate.getFullYear(),
            calendarStartDate.getMonth() + i - 1,
            0
          )
        ),
        end: new Date(
          Date.UTC(
            calendarStartDate.getFullYear(),
            calendarStartDate.getMonth() + i,
            0
          )
        )
      });
    }
  }

  return (
    <Fragment>
      <Grid columns="two">
        {calendarDatesArray.map((date, index) => (
          <Grid.Column key={index}>
            <CalendarHeatmap
              showWeekdayLabels={true}
              startDate={date.start}
              weekdayLabels={['Mon', 'Mon', 'Wed', 'Wed', 'Fri', 'Fri', 'Sun']}
              endDate={date.end}
              horizontal={false}
              values={props.values}
              transformDayElement={(element, value, index) => {
                if (value !== null) {
                  if (value.count > 0) {
                    return (
                      <CalendarValueHOC
                        key={index}
                        lessonFilter={props.lessonFilter}
                        index={index}
                        value={value}
                        subscribers={props.subscribers}
                        element={element}
                      />
                    );
                  } else {
                    return (
                      <g key={index}>
                        {React.cloneElement(element)}
                        <text
                          x={element.props.x}
                          y={element.props.y + 3}
                          style={{ fontSize: 3, color: '#fff' }}
                        >
                          {moment(value.date).format('DD')}
                        </text>
                      </g>
                    );
                  }
                } else {
                  return element;
                }
              }}
              classForValue={value => {
                if (props.lessonFilter.length === 0) {
                  if (!value || value.count === 0) {
                    return 'color-empty';
                  } else if (value.count / props.subscribers === 0) {
                    return 'color-empty';
                  } else if (value.count / props.subscribers <= 0.25) {
                    return 'color-scale-10';
                  } else if (
                    value.count / props.subscribers > 0.25 &&
                    value.count / props.subscribers <= 0.5
                  ) {
                    return 'color-scale-20';
                  } else if (
                    value.count / props.subscribers > 0.5 &&
                    value.count / props.subscribers <= 0.75
                  ) {
                    return 'color-scale-30';
                  } else if (value.count / props.subscribers > 0.75) {
                    return 'color-scale-40';
                  }
                } else {
                  if (value.lessonIds !== undefined) {
                    const lessonCount = props.lessonFilter.reduce(
                      (map, item) => {
                        if (_.has(value.lessonIds, item)) {
                          map.push(item);
                        }
                        return map;
                      },
                      []
                    );
                    if (lessonCount.length > 0) {
                      lessonCount.reduce((map, item) => {
                        map = map + value.lessonIds[item] / value.count;
                      }, 0);
                    }
                    if (!value && lessonCount.length === 0) {
                      return 'color-empty';
                    } else if (lessonCount.length > 0) {
                      return 'color-scale-lesson';
                    }
                  }
                  return 'color-empty';
                }
              }}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Fragment>
  );
});
