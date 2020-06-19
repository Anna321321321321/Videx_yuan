import { Icon, Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router';
import * as Logger from 'videx/client/logger';

const { SubMenu } = Menu;
const { Sider } = Layout;

export interface CourseSiderProps {
  courses: {
    name: string;
    id: string;
  }[];
  adminAccess: boolean;
}

export default class CourseSider extends Component<CourseSiderProps, any> {
  render() {
    return (
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        width={300}
        style={{
          background: '#fff'
        }}
      >
        <Menu
          mode="inline"
          style={{
            height: '100%',
            borderRight: 0
          }}
          inlineIndent={12}
          defaultOpenKeys={['manage', 'courses']}
        >
          {this.props.adminAccess && (
            <SubMenu
              key="manage"
              title={
                <span>
                  <Icon type="solution" />Manage
                </span>
              }
            >
              <Menu.Item key="create">
                <Link
                  onClick={() => {
                    Logger.event('CourseLibrarySider.CreateCourse.Click');
                  }}
                  to="course/create"
                >
                  <Icon type="file-add" />
                  New Course
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
          <SubMenu
            key="courses"
            title={
              <span>
                <Icon type="book" />Courses
              </span>
            }
          >
            {this.props.courses
              .filter(course => course.name)
              .map((course, index) => {
                return (
                  <Menu.Item key={index}>
                    <Link
                      onClick={() => {
                        Logger.event('CourseLibrarySider.Course.Click', {
                          courseId: course.id
                        });
                      }}
                      to={`/course/${course.id}`}
                      style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      {course.name}
                    </Link>
                  </Menu.Item>
                );
              })}
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
