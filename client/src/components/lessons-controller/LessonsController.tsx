import React, { Component } from 'react';
import CreateLesson from './create-lesson';
import { Button, Icon, Switch } from 'antd';

interface ILessonsControllerProps {
  courseId: string;
  changeAnalyticsMode: () => void;
  analyticsMode: boolean;
  lessonCount: number;
  changeShowDrawer: () => void;
}

export default class LessonsController extends Component<
  ILessonsControllerProps,
  null
> {
  render() {
    return (
      <div
        style={{
          margin: '20px 0px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          position: 'relative'
        }}
      >
        <CreateLesson courseId={this.props.courseId} />
        <Button
          type="primary"
          style={{ marginLeft: '8px', borderRadius: 0 }}
          onClick={() => this.props.changeShowDrawer()}
        >
          <Icon
            type="line-chart"
            style={{
              marginRight: '8px'
            }}
          />
          Student Login Heatmap
        </Button>
        <span style={{ right: 0, position: 'absolute' }}>
          Analytics
          <Icon type="appstore" />
          <Switch
            checked={this.props.analyticsMode}
            onChange={() => this.props.changeAnalyticsMode()}
          />
          <Icon type="table" />
        </span>
      </div>
    );
  }
}
