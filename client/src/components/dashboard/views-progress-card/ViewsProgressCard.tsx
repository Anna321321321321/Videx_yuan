import React, { Component } from 'react';
import { Progress, Popover } from 'antd';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
export default class ViewsProgressCard extends Component<any, any> {
  render() {
    const lesson = this.props.lessons;
    return (
      <div>
        <h3>
          Student view completion{' '}
          <Popover
            placement="left"
            content={
              <span>
                Shows the progress rate of students watching all published
                lessons.
              </span>
            }
          >
            <Icon className="videx-hover" name="question circle" color="teal" />
          </Popover>
        </h3>
        <div>
          <div style={{ display: 'flex' }}>
            {lesson.map((item, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  content={
                    <span>
                      <b>{item.name}</b>
                      <br />
                      <img
                        className="videx-lesson-progress-image"
                        src={item.preview}
                      />
                      <br />
                      Watched by{' '}
                      {_.round(
                        (item.uniqueStudents /
                          (this.props.subscribers === 0
                            ? 1
                            : this.props.subscribers)) *
                          100
                      )}% of students
                    </span>
                  }
                >
                  <Progress
                    key={index}
                    className="videx-dashboard-progress"
                    showInfo={false}
                    percent={_.round(
                      (item.uniqueStudents /
                        (this.props.subscribers === 0
                          ? 1
                          : this.props.subscribers)) *
                        100
                    )}
                  />
                </Popover>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
