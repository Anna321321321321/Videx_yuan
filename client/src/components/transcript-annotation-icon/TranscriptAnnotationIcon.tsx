import React, { Fragment } from 'react';
import { compose, onlyUpdateForKeys, withState, withHandlers } from 'recompose';
import { Icon, ListItem, Label } from 'semantic-ui-react';
import { Popover } from 'antd';
import immutable from 'immutable';
import TranscriptAnnotationTagIcon from './TranscriptAnnotationTagIcon';
import TranscriptContextMenu from '../../container/transcript-context-menu';
import * as Logger from 'videx/client/logger';
import Annotation from '../../stores/annotations-store/Annotation';

interface TranscriptAnnotationIcon {
  key: number;
  annotationMap: immutable.Map<any, any>;
  onMouseEnter: (id) => void;
  onMouseLeave: () => void;
  removeAnnotation: any;
  tags: () => string;
  showEdit: boolean;
  setShowEdit: (showEdit) => void;
  handleClick: (annotation) => void;
  onClickHandle: () => void;
  coordinates: {
    xCo: number;
    yCo: number;
  };
  setCoordinates: (coordinates) => void;
}
const enhance = compose(
  onlyUpdateForKeys(['annotationMap', 'showEdit']),
  withState('showEdit', 'setShowEdit', false),
  withState('coordinates', 'setCoordinates', null),
  withHandlers({
    onClickHandle: props => () => {
      props.setShowEdit(false);
      props.setCoordinates(null);
    }
  })
);

export default enhance((props: TranscriptAnnotationIcon) => {
  return (
    <span style={{ position: 'relative' }}>
      <ListItem
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          const annotationObject: Annotation = props.annotationMap.get(
            'annotation'
          );
          const logData = annotationObject.toObject();
          Logger.event('Annotation.Open', {
            annotationId: logData.id,
            annotationColor: logData.color,
            annotationText: logData.text,
            annotationStart: logData.start,
            annotationEnd: logData.end,
            annotationTranscript: logData.transcript
          });
          props.setCoordinates({ xCo: '0px', yCo: '0px' });
          if (window.innerHeight - e.clientY < 300) {
            props.setCoordinates({ xCo: null, yCo: '-300px' });
          }
          props.setShowEdit(!props.showEdit);
        }}
      >
        {props.annotationMap.get('annotation').text === null && (
          <div
            className="videx-transcript-annotation-box videx-hover"
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          >
            <Icon
              name={
                props.annotationMap.get('annotation').share
                  ? props.annotationMap.get('annotation').metadata.editable
                    ? 'share alternate square'
                    : 'student'
                  : 'sticky note outline'
              }
              className="videx-hover"
              style={{
                color:
                  props.annotationMap.get('annotation').color === null
                    ? 'grey'
                    : props.annotationMap.get('annotation').color
              }}
              size="large"
            />
            {props.annotationMap.get('annotation').share && (
              <Label
                className="videx-annotation-icon-share"
                circular
                color="red"
                size={'mini'}
              >
                {props.annotationMap.get('annotation').reaction.counter}
              </Label>
            )}
          </div>
        )}
        {props.annotationMap.get('annotation').text !== null && (
          <Fragment>
            <Popover
              content={
                <div style={{ width: 250, textOverflow: 'wrap' }}>
                  {props.annotationMap.get('annotation').text}
                </div>
              }
              placement="left"
            >
              <div
                className="videx-transcript-annotation-box videx-hover"
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
              >
                <div
                  className="videx-transcript-note"
                  style={{
                    color:
                      props.annotationMap.get('annotation').color ===
                        '#fff110' ||
                      props.annotationMap.get('annotation').color === null
                        ? 'black'
                        : props.annotationMap.get('annotation').color
                  }}
                >
                  <Icon
                    name={
                      props.annotationMap.get('annotation').share
                        ? props.annotationMap.get('annotation').metadata
                            .editable
                          ? 'share alternate square'
                          : 'student'
                        : 'sticky note'
                    }
                    className="videx-hover"
                    style={{
                      color:
                        props.annotationMap.get('annotation').color === null
                          ? 'grey'
                          : props.annotationMap.get('annotation').color
                    }}
                    size="large"
                  />
                  {props.annotationMap.get('annotation').text}
                </div>
                <TranscriptAnnotationTagIcon
                  annotationText={props.annotationMap.get('annotation').text}
                  annotationColor={props.annotationMap.get('annotation').color}
                />
                {props.annotationMap.get('annotation').share && (
                  <Label
                    className="videx-annotation-icon-share"
                    circular
                    color="red"
                    size={'mini'}
                  >
                    {props.annotationMap.get('annotation').reaction.counter}
                  </Label>
                )}
              </div>
            </Popover>
          </Fragment>
        )}
      </ListItem>
      {props.showEdit && (
        <TranscriptContextMenu
          contextMenuData={{
            data: props.annotationMap.get('annotation'),
            xCo: props.coordinates.xCo,
            yCo: props.coordinates.yCo
          }}
          origin="icon"
          onClickHandle={props.onClickHandle}
        />
      )}
    </span>
  );
});
