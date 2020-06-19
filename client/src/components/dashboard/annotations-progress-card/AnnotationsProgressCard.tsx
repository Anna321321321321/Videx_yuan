import React, { Component } from 'react';
import { Progress, Popover } from 'antd';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
export default class AnnotationsProgressCard extends Component<any, any> {
  render() {
    const lesson = this.props.lessons;
    const total =
      this.props.pink + this.props.yellow + this.props.blue + this.props.green;
    return (
      <div>
        <h3>
          Annotations by Highlight Color{' '}
          <Popover
            placement="left"
            content={<span>Shows the division of annotations.</span>}
          >
            <Icon className="videx-hover" name="question circle" color="teal" />
          </Popover>
        </h3>
        <div>
          <div style={{ display: 'flex' }}>
            <Popover
              key={this.props.color}
              placement="top"
              content={
                <span>
                  Pink: {_.round((this.props.pink / total) * 100)}% of
                  annotations
                </span>
              }
            >
              <Progress
                key={this.props.color}
                className="videx-dashboard-progress"
                showInfo={false}
                percent={_.round((this.props.pink / total) * 100)}
              />
            </Popover>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex' }}>
            <Popover
              key={this.props.color}
              placement="top"
              content={
                <span>
                  Blue: {_.round((this.props.blue / total) * 100)}% of
                  annotations
                </span>
              }
            >
              <Progress
                key={this.props.color}
                className="videx-dashboard-progress"
                showInfo={false}
                percent={_.round((this.props.blue / total) * 100)}
              />
            </Popover>
          </div>

          <div>
            <div style={{ display: 'flex' }}>
              <Popover
                key={this.props.color}
                placement="top"
                content={
                  <span>
                    Green: {_.round((this.props.green / total) * 100)}% of
                    annotations
                  </span>
                }
              >
                <Progress
                  key={this.props.color}
                  className="videx-dashboard-progress"
                  showInfo={false}
                  percent={_.round((this.props.green / total) * 100)}
                />
              </Popover>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex' }}>
              <Popover
                key={this.props.color}
                placement="top"
                content={
                  <span>
                    Yellow: {_.round((this.props.yellow / total) * 100)}% of
                    annotations
                  </span>
                }
              >
                <Progress
                  key={this.props.color}
                  className="videx-dashboard-progress"
                  showInfo={false}
                  percent={_.round((this.props.yellow / total) * 100)}
                />
              </Popover>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
