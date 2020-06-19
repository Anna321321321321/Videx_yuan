import { Input } from 'antd';
import React, { Component, ReactNode } from 'react';

interface TextInputStates {
  text: string;
}

export interface TextInputProps {
  placeholder: string;
  prefix?: ReactNode;
  onChange: (value: string) => void;
}

export default class TextInput extends Component<
  TextInputProps,
  TextInputStates
> {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    const { text } = this.state;
    return (
      <Input
        placeholder="Enter your userName"
        prefix={this.props.prefix ? this.props.prefix : null}
        value={text}
        onChange={e => {
          this.setState({ text: e.target.value });
          this.props.onChange(e.target.value);
        }}
      />
    );
  }
}
