import React, { Fragment } from 'react';
import AnnotationManagerEditor from '../editor';
import { compose, withState } from 'recompose';
import * as ColorCore from '../../../core/color';
import { TColorHex } from '../../../core/color/types';
import { Thumbnail } from '../../transcript-thumbnail';
import { Button } from 'antd';
import { Label } from 'semantic-ui-react';
import MiniVideoPlayer from '../video-player';
import moment from 'moment';
import * as Logger from 'videx/client/logger';
import SelectPrivateCheckBoxContainer from '../../../container/select-private-checkbox-container';

interface AnnotationManagerSegmentProps {
  annotation: {
    id: string;
    text: string;
    share: boolean;
    publicForShare: boolean;
    color: TColorHex;
    loading: boolean;
    start: number;
    end: number;
    metadata: {
      editable: boolean;
    };
    reaction: {
      counter: number;
      likeable: boolean;
    };
    transcript: string;
  };
  idx: number;
  loading: boolean;
  thumbnail: {
    url: string;
    sas: string;
    height: number;
    width: number;
  };
  videoMode: boolean;
  setVideoMode: (videoMode: boolean) => void;
  visible: boolean;
  togglePublicForShare: () => void;
}

const enhance = compose(withState('videoMode', 'setVideoMode', false));

export default enhance((props: AnnotationManagerSegmentProps) => {
  return (
    <span>
      <span
        key={props.idx}
        style={{
          width: '95%',
          display: 'flex',
          flexDirection: 'row',
          margin: '20px',
          padding: '20px',
          backgroundColor: ColorCore.converters.hex2rgb(props.annotation.color),
        }}
      >
        <span style={{ flex: 0.2, paddingRight: '50px', width: '50px' }}>
          {props.videoMode && (
            <Fragment>
              <MiniVideoPlayer
                annotationStartTime={props.annotation.start}
                annotationEndTime={props.annotation.end}
                setVideoMode={props.setVideoMode}
              />
              <Button
                style={{ borderRadius: 0 }}
                type="danger"
                onClick={() => {
                  Logger.event('Annotation.Manager.Stop', {
                    id: props.annotation.id,
                  });
                  props.setVideoMode(false);
                }}
              >
                Stop
              </Button>
            </Fragment>
          )}
          {!props.videoMode && (
            <Fragment>
              <span style={{ position: 'relative' }}>
                <Label
                  basic={false}
                  color="blue"
                  size="tiny"
                  style={{
                    position: 'absolute',
                    top: 0,
                    zIndex: 20,
                    width: '80px',
                    borderRadius: 0,
                  }}
                >
                  {moment(props.annotation.start * 1000).format('mm:ss')} -{' '}
                  {moment(props.annotation.end * 1000).format('mm:ss')}
                </Label>
                <Thumbnail
                  segment={{
                    start: props.annotation.start,
                    end: props.annotation.end,
                  }}
                  thumbnail={props.thumbnail}
                  key={props.idx}
                />
              </span>

              <Button
                style={{ borderRadius: 0 }}
                type="primary"
                onClick={() => {
                  Logger.event('Annotation.Manager.Play', {
                    id: props.annotation.id,
                  });
                  props.setVideoMode(true);
                }}
              >
                Play
              </Button>
            </Fragment>
          )}
        </span>
        <span
          style={{
            flex: 0.3,
            marginRight: '10px',
            height: '150px',
            overflowY: 'auto',
          }}
        >
          {props.annotation.transcript}
        </span>
        <span style={{ flex: 0.7 }}>
          <AnnotationManagerEditor
            annotation={props.annotation}
            origin={'icon'}
            onClickHandle={null}
            visible={props.visible}
          />
        </span>
        <SelectPrivateCheckBoxContainer
          id={props.annotation.id}
          publicForShare={props.annotation.publicForShare}
        />
      </span>
    </span>
  );
});
