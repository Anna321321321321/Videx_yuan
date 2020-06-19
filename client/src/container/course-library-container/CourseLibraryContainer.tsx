import { Layout, Modal, Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETCourseShareableLink } from 'videx/api';
import * as Logger from 'videx/client/logger';
import CourseCard from '../../components/course-card';
import CourseSider from '../../components/course-sider';
import ShareCourseModal from '../../components/share-course-modal';
import APICaller from '../../system/api-caller';
import { deinit, init } from './actions';
import * as selector from './selectors';

export interface CourseLibraryContainerProps {
  courses: {
    name: string;
    metadata: {
      token: string;
      ownerAccess: boolean;
    };
    id: string;
  }[];
  metadata: {
    adminAccess: boolean;
  };
  initialized: boolean;
  init: Function;
  deinit: Function;
}

export class CourseLibraryContainer extends Component<
  CourseLibraryContainerProps,
  null
> {
  componentDidMount() {
    Logger.event('CourseLibrary.Load');
    this.props.init();
  }

  componentWillUnmount() {
    this.props.deinit();
  }

  deleteCourse = index => {
    Logger.event('CourseLibrary.Delete.Click', {
      courseId: this.props.courses[index].id
    });
    Modal.confirm({
      title: 'Are you sure you want to delete the courses?',
      content: 'This action will make the courses inaccessible forever.',
      onOk: () => {
        Logger.event('CourseLibrary.Delete.Confirm', {
          courseId: this.props.courses[index].id
        });
        APICaller.del(
          `/api/v4/courses/${this.props.courses[index].id}`,
          new Headers({
            'Content-Type': 'application/json'
          }),
          JSON.stringify({}),
          () => {
            this.props.init();
          }
        );
      },
      onCancel: () => {
        Logger.event('CourseLibrary.Delete.Cancel', {
          courseId: this.props.courses[index].id
        });
      }
    });
  };

  render() {
    if (this.props.initialized) {
      return (
        <Layout className="ant-layout-has-sider">
          <CourseSider
            adminAccess={this.props.metadata.adminAccess}
            courses={this.props.courses}
          />
          <Layout
            style={{
              padding: '0 24px'
            }}
          >
            <Layout.Content
              style={{
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.courses.map((course, index) => (
                <CourseCard
                  key={index}
                  {...course}
                  onDeleteCallback={() => this.deleteCourse(index)}
                />
              ))}
            </Layout.Content>
          </Layout>
        </Layout>
      );
    } else {
      return (
        <Layout
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spin size="large" />
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => selector.flattenData(state);

const mapDispatchToProps = {
  init,
  deinit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseLibraryContainer);
