import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import AnnotationPickerContainer from '../../container/annotation-picker-container';

const enhance = compose(onlyUpdateForKeys(['top', 'left']));

interface AnnotationPickerWrapperProps {
  top: number;
  left: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default enhance((props: AnnotationPickerWrapperProps) => (
  <div
    style={{
      left: props.left
    }}
    className="videx-filmstrip-annotation-picker"
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <AnnotationPickerContainer />
  </div>
));
