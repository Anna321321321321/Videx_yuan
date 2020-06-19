import { Card, Progress, Spin, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';
import * as Logger from 'videx/client/logger';
import action from './action';
import _ from 'lodash';
import LessonListItemHOC from './LessonListItemHOC';
import { Table } from 'semantic-ui-react';

interface LessonListItemProps {
  adminAccess: boolean;
  annotations: any[];
  category: string;
  courseId: string;
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
  pausesCount: number;
  totalViews: number;
  uniqueStudents: number;
  averageViewTime: number;
  analyticsMode: boolean;
  subscribers: number;
}

const LessonCard = (props: LessonListItemProps) => (
  <span>
    {props.status === 4 && (
      <Card
        className="videx-lesson-card"
        actions={action({
          adminAccess: props.adminAccess,
          courseId: props.courseId,
          lessonId: props.id,
          publish: props.publish
        })}
        cover={
          <span style={{ position: 'relative' }}>
            <Link
              to={`/course/${props.courseId}/lesson/${props.id}`}
              onClick={() => {
                Logger.event('LessonCard.Lesson.Click', {
                  courseId: props.courseId,
                  lessonId: props.id
                });
              }}
            >
              <span
                className="videx-lesson-card-image"
                style={{ content: `url(${props.preview})` }}
              />
            </Link>
            <Progress
              style={{
                position: 'absolute',
                bottom: -4,
                left: 0,
                borderRadius: 0,
                zIndex: 10
              }}
              percent={
                props.history.playhead
                  ? (props.history.playhead / props.duration) * 100
                  : 0
              }
              showInfo={false}
              status={'active'}
            />
            <span
              style={{
                position: 'absolute',
                right: 0,
                borderRadius: 0,
                zIndex: 10,
                height: '100%'
              }}
            >
              {props.annotations.length !== 0 && (
                <Tooltip title="Annotations">
                  <Tag color="red">{props.annotations.length}</Tag>
                </Tooltip>
              )}

              {props.publish !== null && (
                <Tooltip title={props.publish ? 'Published' : 'Unpublished'}>
                  <div
                    style={{
                      margin: '15px 0'
                    }}
                  >
                    {props.publish ? (
                      <Tag color="blue">P</Tag>
                    ) : (
                      <Tag color="red">U</Tag>
                    )}
                  </div>
                </Tooltip>
              )}
              {props.duration !== null && (
                <span className="videx-lesson-card-duration">
                  {props.duration}
                </span>
              )}
            </span>
          </span>
        }
      >
        <Link
          to={`/course/${props.courseId}/lesson/${props.id}`}
          onClick={() => {
            Logger.event('LessonCard.Lesson.Click', {
              courseId: props.courseId,
              lessonId: props.id
            });
          }}
        >
          <Card.Meta
            title={props.name}
            description={
              <div>
                <p className="videx-lesson-summary">{props.summary}</p>
                <p>{moment(props.releaseDate).format('dddd, MMMM Do YYYY')}</p>
              </div>
            }
          />
        </Link>
      </Card>
    )}
    {props.status !== 4 && (
      <Card title={props.name} style={{ width: 230 }}>
        <Spin>
          <p
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {props.summary}
          </p>
          <p>{moment(props.releaseDate).format('dddd, MMMM Do YYYY')}</p>
        </Spin>
      </Card>
    )}
  </span>
);

const LessonDetailed = (props: LessonListItemProps) => {
  return (
    <Table.Row>
      <Table.Cell width={3}>
        <span style={{ position: 'relative' }}>
          <Link
            to={`/course/${props.courseId}/lesson/${props.id}`}
            onClick={() => {
              Logger.event('LessonCard.Lesson.Click', {
                courseId: props.courseId,
                lessonId: props.id
              });
            }}
          >
            <span>{props.name}</span>
            <img className="videx-lesson-detail-image" src={props.preview} />
          </Link>
          <span
            style={{
              position: 'absolute',
              right: 0,
              borderRadius: 0,
              zIndex: 10,
              height: '100%'
            }}
          >
            {props.duration !== null && (
              <span className="videx-lesson-detail-duration">
                {props.duration}
              </span>
            )}
          </span>
        </span>
      </Table.Cell>
      <Table.Cell>
        <Progress
          className="videx-table-progress"
          percent={_.round(
            (props.uniqueStudents /
              (props.subscribers === 0 ? 1 : props.subscribers)) *
              100
          )}
        />
        {props.uniqueStudents} out of {props.subscribers} students
      </Table.Cell>
      <Table.Cell>
        {props.averageViewTime === undefined ? '0' : props.averageViewTime}
      </Table.Cell>
      <Table.Cell>
        {props.totalViews === undefined ? '0' : props.totalViews}
      </Table.Cell>
      <Table.Cell>
        {props.annotations.length}
      </Table.Cell>
      <Table.Cell>
        {props.pausesCount === undefined ? '0' : props.pausesCount}
      </Table.Cell>
    </Table.Row>
  );
};

export default LessonListItemHOC(LessonCard, LessonDetailed)();
