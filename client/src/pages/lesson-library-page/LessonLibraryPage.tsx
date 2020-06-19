import { Layout } from 'antd';
import React, { Component } from 'react';
import LessonLibraryContainer from '../../container/lesson-library-container';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';

export default class LessonLibraryPage extends Component<any, any> {
  render() {
    return (
      <Layout className="videx-lesson-library-page">
        <Header />
        <LessonLibraryContainer courseId={this.props.params.courseId} />
        <Footer />
      </Layout>
    );
  }
}
