import { Button, Icon, Input, Spin } from 'antd';
import * as _ from 'lodash';
import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import Tags from './Tags';

interface AnnotatiionEditorProps {
  annotation: {
    text: string;
    share: boolean;
    publicForShare: boolean;
    color: string;
    loading: boolean;
    metadata: {
      editable: boolean;
    };
    reaction: {
      counter: number;
      likeable: boolean;
    };
  };
  updateColor: (color: string) => void;
  updateText: (text: string) => void;
  toggleShare: () => void;
  toggleLike: () => void;
  remove: () => void;
  link: () => void;
}

interface AnnotatiionEditorStates {
  text: string;
}

// prettier-ignore
export default class AnnotatiionEditor extends Component<AnnotatiionEditorProps, AnnotatiionEditorStates> {
  state = {
    text: this.props.annotation.text,
  };

  delayAutoSave = _.debounce(() => this.props.updateText(this.state.text), 1000);

  setText = text => {
    this.setState({ text });
    this.delayAutoSave();
  }

  addTag = (tag: string) => {
    // prettier-ignore
    this.setText(`${this.state.text ? this.state.text : ''}${tag}`)
  };

  removeTag = (tag: string) => {
    // prettier-ignore
    this.setText(this.state.text? this.state.text.replace(`${tag}`, ''): '');
  };

  render() {
    const {
     text
    } = this.state;
    const {
      loading,
      share,
      metadata,
      reaction,
      color
    } = this.props.annotation;
    const { counter, likeable } = reaction;
    const { editable } = metadata;
    return (
      <Spin spinning={loading}>
        <div
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {editable && (
            <CirclePicker
              color={color ? color : ' #ffffff'}
              onChangeComplete={color => this.props.updateColor(color.hex)}
              colors={[
                '#e32990',
                '#fff110',
                '#4cba35',
                '#28a3dc',
                '#9719ff',
                '#ffffff'
              ]}
              circleSpacing={9}
              circleSize={18}
              width='inherit'
              style={{
                height: '100px',
              }}
            />
          )}
          {editable && (
            <div>
              <Tags
                text={text}
                tag="#interesting"
                onAdd={this.addTag}
                onRemove={this.removeTag}
              />
              <Tags
                text={text}
                tag="#important"
                onAdd={this.addTag}
                onRemove={this.removeTag}
              />
            </div>
          )}
          <Input.TextArea
            onChange={e => this.setText(e.target.value)}
            value={text ? text : ''}
            disabled={!editable}
            rows={3}
          />
          <div>
            {editable && (
              <Button onClick={this.props.toggleShare}>
                {share ? <Icon type="lock" /> : <Icon type="unlock" /> }
              </Button>
            )}
            <Button onClick={this.props.link}>
              <Icon type="link" />
            </Button>
            <Button onClick={this.props.toggleLike} disabled={editable}>
              {counter}
              {likeable ? <Icon type="like-o" /> : <Icon type="like" />}
            </Button>
            {editable && (
              <Button type="danger" onClick={this.props.remove}>
                <Icon type="delete" />
              </Button>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}
