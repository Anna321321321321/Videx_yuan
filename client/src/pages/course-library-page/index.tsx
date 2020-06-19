import { Layout } from 'antd';
import React, { Component } from 'react';
import CourseLibraryContainer from '../../container/course-library-container';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';

export default class CourseLibraryPage extends Component<any, any> {
  render() {
    return (
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <Header />
        <CourseLibraryContainer />
        <Footer />
      </Layout>
    );
  }
}
