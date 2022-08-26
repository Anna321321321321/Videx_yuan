import React from 'react';
import { TextArea, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import {
  compose,
  withHandlers,
  onlyUpdateForKeys,
  withState,
  lifecycle
} from 'recompose';
import APICaller from '../../../system/api-caller';

interface NotePanelProps {
  annotation: {
    text: string;
    share: boolean;
    publicForShare: boolean;
    color: string;
    loading: boolean;
    lessonId: string;
    courseId: string;
  };
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

const updateAnnotation = (id, lessonId, courseId, text) => {
  APICaller.put(
    `/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}`,
    JSON.stringify(text),
    () => {
      true;
    }
  );
};

const delayAutoSave = _.debounce(
  (id, lessonId, courseId, annotationText, setSubmitted) => {
    const text = annotationText === '' ? null : annotationText;
    updateAnnotation(id, lessonId, courseId, { text: text });
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
        props.annotation.lessonId,
        props.annotation.courseId,
        props.text,
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
