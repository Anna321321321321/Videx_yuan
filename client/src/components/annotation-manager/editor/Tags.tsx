import { Tag } from 'antd';
import React, { Component } from 'react';
import * as Logger from 'videx/client/logger';

interface TagsProps {
  text: string;
  tag: string;
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

interface TagsStates {
  checked: boolean;
}

export default class Tags extends Component<TagsProps, TagsStates> {
  // prettier-ignore
  state = {
    checked: this.props.text ? this.props.text.includes(`#${this.props.tag}`) : false
  };

  static getDerivedStateFromProps(props: TagsProps): TagsStates {
    return {
      checked: props.text ? props.text.includes(`${props.tag}`) : false
    };
  }

  onChange = (value: boolean) => {
    if (value) {
      Logger.event('Annotation.Tags.Add', { tag: this.props.tag });
      this.props.onAdd(this.props.tag);
    } else {
      Logger.event('Annotation.Tags.Remove', { tag: this.props.tag });
      this.props.onRemove(this.props.tag);
    }
  };

  render() {
    return (
      <Tag.CheckableTag checked={this.state.checked} onChange={this.onChange}>
        {this.props.tag}
      </Tag.CheckableTag>
    );
  }
}
