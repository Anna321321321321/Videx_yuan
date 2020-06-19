import 'whatwg-fetch';
import { Layout } from 'antd';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/header';
import CourseRegisterContent from '../components/course-register-content';
import Footer from '../components/footer';

export default class register extends Component {
  static getInitialProps({ req }) {
    const { token } = req.query;
    return {
      token: token != null && token !== '' ? token : null
    };
  }

  handleSubmit = async (token, onSuccess, onFail) => {
    token = token.trim();
    const res = await fetch(`/api/v4/courses/register?token=${token}`, {
      method: 'PUT',
      credentials: 'include'
    });
    if (!res.ok) {
      onFail();
    } else {
      onSuccess();
    }
  };

  render() {
    return (
      <Index>
        <Layout
          style={{
            minHeight: '100vh'
          }}
        >
          <Header />
          <Layout.Content
            style={{
              padding: '0 10vw'
            }}
          >
            <CourseRegisterContent
              onSubmit={this.handleSubmit}
              token={this.props.token}
            />
          </Layout.Content>
          <Footer />
        </Layout>
      </Index>
    );
  }
}
