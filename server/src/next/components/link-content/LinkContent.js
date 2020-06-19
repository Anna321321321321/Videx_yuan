import { Button, Steps, Spin } from 'antd';
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
      link: null,
      current: 0
    };
  }

  steps = () => [
    {
      title: 'Access Token',
      content: <PasteToken token={this.state.token} onChange={this.setToken} />
    },
    {
      title: 'Searching',
      content: <Spin size="large" />
    },
    {
      title: 'Result',
      content: <Result link={this.state.link} />
    }
  ];

  setToken = token => this.setState({ ...this.state, token: token });

  reset = () => {
    const current = this.state.current + 1;
    this.setState({
      ...this.state,
      current: 0,
      link: null,
      token: this.props.token
    });
  };

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

  onSubmit = () => {
    this.next();
    this.props.onSubmit(this.state.token, link => {
      this.next();
      this.setState({
        ...this.state,
        link
      });
    });
  };

  render() {
    const { current } = this.state;
    return (
      <div className="link-container">
        <style jsx>{container}</style>
        <style jsx>{content}</style>
        <style jsx>{action}</style>
        <Steps current={current}>
          {this.steps().map(item => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="link-content">
          {this.steps()[this.state.current].content}
        </div>
        <div className="link-action">
          {this.state.current == 0 && (
            <Button
              type="primary"
              onClick={() => {
                this.onSubmit();
              }}
            >
              Next
            </Button>
          )}
          {this.state.current === 2 && (
            <Button type="primary" onClick={() => this.reset()}>
              Restart
            </Button>
          )}
        </div>
      </div>
    );
  }
}
