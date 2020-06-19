import { Layout } from 'antd';
import React, { Fragment } from 'react';
import LessonlibraryHeader from '../../components/lesson-library-header';
import LessonListItem from '../../components/lesson-list-item';
import LessonsController from '../../components/lessons-controller';
import CategorySelector from '../lesson-library-category-selector';
import { Grid } from 'semantic-ui-react';
import { ViewsProgressCard } from '../../components/dashboard';
import { Table, Icon } from 'semantic-ui-react';
import { Drawer } from 'antd';
import CalendarContainer from '../lesson-library-calendar-container';
import AnnotationMnagerLessons from '../../components/annotation-manager-lessons';

// Create button here

type LessonLibraryProps = {
  lessons: {
    category: string;
    duration?: number;
    history?: {
      watched: boolean;
      counter: number;
      date: Date;
      playhead: number;
    };
    id: string;
    name: string;
    summary: string;
    releaseDate: string;
    status: number;
    preview?: string;
    publish?: boolean;
    annotations: any[];
    pausesCount: number;
    uniqueStudents: number;
    totalViews: number;
    dwellingTimePerStudent: number;
    dwellingTimePerSession: number;
  }[];
  courseId: string;
  adminAccess: boolean;
  subscribers: number;
  lessonCount: number;
  analyticsMode: boolean;
  changeAnalyticsMode: () => void;
  changeShowDrawer: () => void;
  showDrawer: boolean;
  calendarStartDate: Date;
  calendarEndDate: Date;
  calendarHeatmapData: [];
  getHeatmapData: () => void;
  heatmapData: [];
  setHeatMapData: (value) => void;
  calendarFilter: (value) => void;
  lessonFilter: [];
  initialized: boolean;
};

export default (props: LessonLibraryProps) => {

  return (
    <Layout.Content>
      <div
        style={{
          margin: '0 10%'
        }}
      >
        <LessonlibraryHeader lessonCount={props.lessonCount} />
        <AnnotationMnagerLessons
          annotations={props.lessons.map(item => item.annotations).reduce((acc, val) => acc.concat(val), [])}
          courseId={props.courseId}
        />
        {props.adminAccess && (
          <Fragment>
            <ViewsProgressCard
              subscribers={props.subscribers}
              lessonCount={props.lessonCount}
              courseId={props.courseId}
              lessons={props.lessons}
            />
            <Icon name="stop" size="large" style={{ color: '#52c41a' }} />
            <span>
              Lesson(s) watched by all {props.subscribers} students
            </span>{' '}
            &nbsp;
            <Icon name="stop" size="large" style={{ color: '#1890ff' }} />
            <span>Watched by less than {props.subscribers} students</span>{' '}
            <Icon name="stop" size="large" style={{ color: ' #cccccc' }} />
            <span>Yet to be watched by students</span> &nbsp;
            <Drawer
              title={<h1>Student Login Heatmap</h1>}
              placement="right"
              closable={true}
              onClose={props.changeShowDrawer}
              visible={props.showDrawer}
              width={1000}
            >
              <CalendarContainer courseId={props.courseId} />
            </Drawer>
          </Fragment>
        )}
        {props.adminAccess && (
          <LessonsController
            analyticsMode={props.analyticsMode}
            changeAnalyticsMode={props.changeAnalyticsMode}
            changeShowDrawer={props.changeShowDrawer}
            courseId={props.courseId}
            lessonCount={props.lessonCount}
          />
        )}
      </div>

      <CategorySelector>
        <div
          style={{
            margin: '0 10px'
          }}
        >
          {!props.analyticsMode && (
            <Grid padded>
              {props.lessons.map((item, index) => (
                <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                  <LessonListItem
                    {...item}
                    adminAccess={props.adminAccess}
                    courseId={props.courseId}
                    analyticsMode={props.analyticsMode}
                  />
                </Grid.Column>
              ))}
            </Grid>
          )}
          {props.analyticsMode && (
            <Table celled padded style={{ width: '80%' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Lesson</Table.HeaderCell>
                  <Table.HeaderCell>Completion Rate</Table.HeaderCell>
                  <Table.HeaderCell>Average view time</Table.HeaderCell>
                  <Table.HeaderCell>View Count</Table.HeaderCell>
                  <Table.HeaderCell>Annotations</Table.HeaderCell>
                  <Table.HeaderCell>Pauses</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {props.lessons.map((item, index) => (
                  <LessonListItem
                    key={index}
                    {...item}
                    adminAccess={props.adminAccess}
                    courseId={props.courseId}
                    analyticsMode={props.analyticsMode}
                    subscribers={props.subscribers}
                  />
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </CategorySelector>
    </Layout.Content>
  );
};
