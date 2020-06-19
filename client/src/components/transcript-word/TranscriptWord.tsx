import React from 'react';
import ReactDOM from 'react-dom';
import { notification } from 'antd';
import { compose, lifecycle, onlyUpdateForKeys } from 'recompose';

interface TranscriptWordProps {
  text: string;
  background: string;
  fontWeight: any;
  color: string;
  onMouseDown: () => void;
  onMouseMove: () => void;
  onMouseUp: () => void;
}

const enhance = compose(
  lifecycle({
    componentDidMount() {
      // check if this text is a math equation
      const re = new RegExp('<math>(.*?)</math>');
      const regexResult = re.exec(this.props.text);
      if (regexResult !== null) {
        try {
          // @ts-ignore
          katex.render(regexResult[1], ReactDOM.findDOMNode(this));
        } catch (e) {
          notification.error({
            message: 'Transcript Error',
            description:
              'Could not parse Math formula. Please inform your instructor about this issue!'
          });
        }
      }
    }
  }),
  onlyUpdateForKeys(['background', 'color'])
);

export default enhance((props: TranscriptWordProps) => {
  return (
    <span
      style={{
        color: props.color,
        background: props.background,
        fontWeight: props.fontWeight
      }}
      onMouseDown={props.onMouseDown}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
    >
      {props.text + ' '}
    </span>
  );
});