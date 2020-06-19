import React, { Component, Fragment } from 'react';
import { TextArea, Icon } from 'semantic-ui-react';
import { Alert } from 'antd';
import _ from 'lodash';
import Tags from './Tags';

export default class NotePanel extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      text:
        this.props.annotation.text === null ? '' : this.props.annotation.text,
      submitted: true
    };
  }

  submitNote = () => {
    const { id } = this.props.annotation;
    const text = this.state.text === '' ? null : this.state.text;
    this.props.updateAnnotation(id, { text: text });
    this.setState({ submitted: true });
  };
  delayAutoSave = _.debounce(() => this.submitNote(), 500);

  trackKeyPressAndSubmit = _.debounce(() => {
    this.submitNote();
    this.setState({ submitted: true });
  }, 1000);

  onChange = event => {
    this.setState({ text: event.target.value, submitted: false });
  };

  addTag = (tag: string) => {
    // prettier-ignore
    this.setTag(`${this.state.text ? this.state.text : ''}${tag}`);
    this.setState({ submitted: false });
  };

  removeTag = (tag: string) => {
    // prettier-ignore
    this.setTag(this.state.text ? this.state.text.replace(`${tag}`, '') : '');
    this.setState({ submitted: false });
  };

  setTag = text => {
    this.setState({ text });
    this.delayAutoSave();
  };

  render() {
    return (
      <Fragment>
        <div className="videx-tags-container">
          <Tags
            text={this.state.text}
            tag=" #important "
            onAdd={this.addTag}
            onRemove={this.removeTag}
          />
          <Tags
            text={this.state.text}
            tag=" #interesting "
            onAdd={this.addTag}
            onRemove={this.removeTag}
          />
          <Tags
            text={this.state.text}
            tag=" #confusing "
            onAdd={this.addTag}
            onRemove={this.removeTag}
          />
          <Tags
            text={this.state.text}
            tag=" #difficult "
            onAdd={this.addTag}
            onRemove={this.removeTag}
          />
        </div>

        <div className="videx-grid">
          <div style={{ flex: 1 }}>
            {this.state.submitted && <Icon name="check circle" color="green" />}
            {!this.state.submitted && <Icon name="keyboard" color="orange" />}
          </div>
          <div style={{ flex: 1 }}>
            <TextArea
              style={{ width: '100%' }}
              rows={4}
              onChange={this.onChange}
              autoFocus={true}
              value={this.state.text}
              onKeyUp={e => this.trackKeyPressAndSubmit()}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
