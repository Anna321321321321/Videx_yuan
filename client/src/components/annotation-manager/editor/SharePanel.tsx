import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { compose, withHandlers, onlyUpdateForKeys } from 'recompose';
import * as Logger from 'videx/client/logger';

interface SharePanelProps {
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
}

const enhance = compose(
  withHandlers({
    handleClick: props => () => {
      Logger.event('Annotation.Share', { share: !props.annotation.share });
      const newAnnotation = props.annotation;
      props.updateAnnotation(newAnnotation.id, {
        share: !props.annotation.share
      });
    }
  }),
  onlyUpdateForKeys(['annotation'])
);

export default enhance((props: SharePanelProps) => (
  <span onClick={props.handleClick}>
    {props.origin === 'icon' && (
      <Button basic={true} compact={true}>
        <Icon
          name="share alternate"
          color={props.annotation.share ? 'blue' : 'grey'}
          className="videx-hover"
        />{' '}
        {props.annotation.share ? 'Shared' : 'Share'}
      </Button>
    )}
    {props.origin === 'highlight' && (
      <Icon
        name="share alternate"
        size="large"
        color={props.annotation.share ? 'blue' : 'grey'}
        className="videx-hover"
      />
    )}
  </span>
));
