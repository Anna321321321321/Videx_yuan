import { Layout, Spin } from 'antd';
import React, { Component } from 'react';
import CreateEditCourseSteps from '../../components/create-edit-course-steps';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';
import APICaller from '../../system/api-caller';

interface EditCoursePageStates {
  id: string;
  name: string;
  releaseDate: string;
  initialized: boolean;
}

export default class EditCoursePage extends Component<
  any,
  EditCoursePageStates
> {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      releaseDate: null,
      initialized: false
    };
  }

  componentDidMount() {
    APICaller.get(`/api/v4/courses/${this.props.params.id}`, payload =>
      this.setState({
        id: payload.id,
        name: payload.name,
        releaseDate: payload.releaseDate,
        initialized: true
      })
    );
  }

  render() {
    return (
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <Header />
        {this.state.initialized && (
          <Layout>
            <CreateEditCourseSteps
              mode="edit"
              id={this.state.id}
              name={this.state.name}
              releaseDate={this.state.releaseDate}
            />
          </Layout>
        )}
        {!this.state.initialized && (
          <Layout
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Spin size="large" />
          </Layout>
        )}
        <Footer />
      </Layout>
    );
  }
}
