import React, { Component } from 'react';
import { TextArea, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import {
  compose,
  withHandlers,
  onlyUpdateForKeys,
  withState,
  lifecycle
} from 'recompose';

interface NotePanelProps {
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
  updateAnnotation: (id, annotation) => void;
  handleClick: () => void;
  origin: string;
  setText: (text) => void;
  setSubmitted: (value) => void;
  text: string;
  submitted: boolean;
  trackKeyPressAndSubmit: () => void;
  onChange: (value) => void;
  visible: boolean;
}

const delayAutoSave = _.debounce(
  (id, annotationText, updateAnnotation, setSubmitted) => {
    const text = annotationText === '' ? null : annotationText;
    updateAnnotation(id, { text: text });
    setSubmitted(true);
  },
  500
);

const enhance = compose(
  withState('text', 'setText', ''),
  withState('submitted', 'setSubmitted', true),
  lifecycle({
    componentWillMount() {
      const text =
        this.props.annotation.text === null ? '' : this.props.annotation.text;
      this.props.setText(text);
    },
    componentWillReceiveProps(nextProps) {
      if (!this.props.visible && nextProps.visible) {
        const text =
          this.props.annotation.text === null ? '' : this.props.annotation.text;
        this.props.setText(text);
      }
    }
  }),
  withHandlers({
    trackKeyPressAndSubmit: props => () => {
      delayAutoSave(
        props.annotation.id,
        props.text,
        props.updateAnnotation,
        props.setSubmitted
      );
    },
    onChange: props => event => {
      props.setText(event.target.value);
      props.setSubmitted(false);
    }
  }),
  onlyUpdateForKeys(['annotation', 'text', 'submitted', 'visible'])
);
export default enhance((props: NotePanelProps) => {
  return (
    <div className="videx-grid">
      <div style={{ flex: 1 }}>
        {props.visible && (
          <TextArea
            style={{ width: '100%' }}
            rows={4}
            onChange={props.onChange}
            value={props.text}
            onKeyUp={e => props.trackKeyPressAndSubmit()}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        {props.submitted && <Icon name="check circle" color="green" />}
        {!props.submitted && <Icon name="keyboard" color="orange" />}
      </div>
    </div>
  );
});
