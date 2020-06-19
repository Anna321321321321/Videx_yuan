import { Button, Steps } from 'antd';
import React, { Component } from 'react';
import Terms from '../terms';
import Consent from '../consent';
import PasteToken from '../paste-token';
import Result from './Result';
import { content, action, container } from './styles';

export default class CourseRegisterContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      current: 0,
      status: null
    };
  }

  steps = () => [
    {
      title: 'Access Token',
      content: <PasteToken token={this.state.token} onChange={this.setToken} />
    },
    {
      title: 'Consent Form',
      content: <Consent />
    },
    {
      title: 'Terms of Use',
      content: <Terms />
    },
    {
      title: 'Back to Home Page',
      content: <Result status={this.state.status} />
    }
  ];

  setToken = token => this.setState({ ...this.state, token: token });

  next = () => {
    const current = this.state.current + 1;
    this.setState({
      ...this.state,
      current
    });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({
      ...this.state,
      current
    });
  };

  setStatus = status => this.setState({ ...this.state, status });

  onSubmit = () => {
    this.setStatus('loading');
    this.props.onSubmit(
      this.state.token,
      () => {
        this.setStatus('success');
        this.next();
      },
      () => {
        this.setStatus('fail');
        this.next();
      }
    );
  };

  render() {
    const { current } = this.state;
    return (
      <div className="course-register-container">
        <style jsx>{container}</style>
        <style jsx>{content}</style>
        <style jsx>{action}</style>
        <Steps current={current}>
          {this.steps().map(item => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="course-register-content">
          {this.steps()[this.state.current].content}
        </div>
        <div className="course-register-action">
          {this.state.current <= 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {this.state.current === 2 && (
            <Button
              type="primary"
              onClick={() => this.onSubmit()}
              loading={this.state.status === 'loading'}
            >
              Agree
            </Button>
          )}
          {this.state.current === 2 && (
            <Button style={{ marginLeft: 8 }}>
              <a href={'/'}>Decline</a>
            </Button>
          )}
          {this.state.current === 3 && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => (window.location = '/')}
            >
              Back to Home
            </Button>
          )}
          {this.state.current > 0 &&
            this.state.current <= 2 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => (window.location = '/logout')}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}
