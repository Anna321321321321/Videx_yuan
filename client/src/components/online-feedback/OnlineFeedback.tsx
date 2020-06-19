import React, { Fragment } from 'react';
import { compose, withState } from 'recompose';
import * as Logger from 'videx/client/logger';
import FormDecorator from './FormDecorator';
import { Icon } from 'semantic-ui-react';

const enhance = compose(withState('visible', 'changeVisible', false));

interface OnlineFeedbackProps {
  visible: boolean;
  changeVisible: (visible: boolean) => void;
}

export const OnlineFeedback = (props: OnlineFeedbackProps) => (
  <Fragment>
    <Icon color="yellow" name="smile" />
    <a
      onClick={() => {
        Logger.event('OnlineFeedback.Open');
        props.changeVisible(true);
      }}
    >
      Online Feedback
    </a>
    <FormDecorator
      visible={props.visible}
      onCancel={() => props.changeVisible(false)}
    />
  </Fragment>
);

export default enhance(OnlineFeedback);
