import { Layout } from 'antd';
import React, { Component } from 'react';
import CreateEditCourseSteps from '../../components/create-edit-course-steps';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';

export default class CreateCoursePage extends Component<any, any> {
  render() {
    return (
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <Header />
        <CreateEditCourseSteps mode="create" />
        <Footer />
      </Layout>
    );
  }
}
