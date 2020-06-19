import { Spin, Alert } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as Logger from 'videx/client/logger';
import * as DashboardStore from '../../stores/dashboard-store';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import {
  SessionsCalendarHeatmap,
  GridIconLegend
} from '../../components/dashboard';
import {
  compose,
  lifecycle,
  withHandlers,
  onlyUpdateForKeys,
  branch,
  renderComponent
} from 'recompose';

export interface DashboardCourseContainerProps {
  metadata: {
    adminAccess: boolean;
  };
  initialized: boolean;
  init: Function;
  deinit: Function;
  courseId: string;
  subscribers: number;
  releaseDate: Date;
  lessonCountWithNameOverDate: any;
  calendarStartDate: Date;
  calendarEndDate: Date;
  calendarHeatmapData: [];
  lessonData: any;
  getDropDownOptions: () => [];
  handleChange: (e, value) => void;
  getHeatmapData: () => void;
  heatmapData: [];
  setHeatMapData: (value) => void;
  calendarFilter: (value) => void;
  lessonFilter: [];
}

const mapStateToProps = state => ({
  subscribers: DashboardStore.selectors.subscribers(state),
  releaseDate: DashboardStore.selectors.releaseDate(state),
  lessonCountWithNameOverDate: DashboardStore.selectors.lessonCountWithNameOverDate(
    state
  ),
  calendarStartDate: DashboardStore.selectors.calendarStartDate(state),
  calendarEndDate: DashboardStore.selectors.calendarEndDate(state),
  calendarHeatmapData: DashboardStore.selectors.calendarHeatmapData(state),
  lessonData: DashboardStore.selectors.lessonData(state),
  initialized: DashboardStore.selectors.initialized(state),
  lessonFilter: DashboardStore.selectors.lessonFilter(state)
});

const mapDispatchToProps = {
  init: DashboardStore.actions.init,
  deinit: DashboardStore.actions.deinit,
  calendarFilter: DashboardStore.actions.calendarFilter
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      this.props.init(this.props.courseId);
      Logger.event('Dashboard.Load');
    },
    componentWillUnmount() {
      this.props.deinit();
    }
  }),
  withHandlers({
    getDropDownOptions: props => () => {
      let values = [];
      props.lessonData.map(item => {
        const dropdownItem = { key: item.id, text: item.name, value: item.id };
        values.push(dropdownItem);
      });
      return values;
    },
    handleChange: props => (e, { value }) => {
      props.calendarFilter(value);
    }
  }),
  onlyUpdateForKeys([
    'initialized',
    'lessonCountWithNameOverDate',
    'calendarHeatmapData',
    'subscribers',
    'calendarStartDate',
    'calendarEndDate',
    'lessonFilter'
  ]),
  branch(props => !props.initialized, renderComponent(Spin))
);

export default enhance((props: DashboardCourseContainerProps) => {
  const {
    calendarEndDate,
    calendarStartDate,
    subscribers,
    lessonFilter
  } = props;
  return (
    <Fragment>
      {props.initialized && (
        <Fragment>
          <Dropdown
            placeholder="Lessons"
            fluid
            multiple
            selection
            options={props.getDropDownOptions()}
            onChange={props.handleChange}
          />
          {props.lessonCountWithNameOverDate !== null &&
            subscribers > 0 && (
              <Fragment>
                <h1>How many students are logging in each day?</h1>
                <p>*Hover on the square to see what lessons they watched</p>
                <GridIconLegend />
                <div style={{ width: '100%', marginLeft: 30 }}>
                  <SessionsCalendarHeatmap
                    calendarStartDate={calendarStartDate}
                    calendarEndDate={calendarEndDate}
                    values={props.calendarHeatmapData}
                    subscribers={subscribers}
                    lessonFilter={lessonFilter}
                  />
                </div>
              </Fragment>
            )}
          {(props.lessonCountWithNameOverDate === null ||
            props.lessonCountWithNameOverDate === {} ||
            subscribers === 0) && (
            <Alert
              message="No information to display"
              description="No students have logged in"
              type="info"
              showIcon
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
});
