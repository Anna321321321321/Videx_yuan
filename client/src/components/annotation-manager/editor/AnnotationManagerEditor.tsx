import React, { Fragment } from 'react';
import {
  compose,
  mapProps,
  branch,
  renderComponent,
  onlyUpdateForKeys,
} from 'recompose';
import { connect } from 'react-redux';
import * as AnnotationsStore from '../../../stores/annotations-store';
import * as VideoPlayerStore from '../../../stores/video-player-store';
import * as UserStore from '../../../stores/user-store';
import ErasePanel from './ErasePanel';
import HighlightPanel from './HighlightPanel';
import NotePanel from './NotePanel';
import SharePanel from './SharePanel';
import { Icon } from 'semantic-ui-react';
import { Spin } from 'antd';
import * as Logger from 'videx/client/logger';
import { TColorHex } from '../../../core/color/types';

interface AnnotationsEditContainerProps {
  actionLike: (annotationId: string) => void;
  actionUnlike: (annotationId: string) => void;
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
  delete: () => void;
  id: string;
  origin: string;
  update: (annotationId, object) => void;
  onMouseEnterAnnotation: (id) => void;
  onMouseLeaveAnnotation: () => void;
  onClickHandle?: () => void;
  playAnnotation: (value) => void;
  userType: number;
  visible: boolean;
}

const actions = {
  update: AnnotationsStore.actions.update,
  delete: AnnotationsStore.actions.remove,
  onMouseEnterAnnotation: AnnotationsStore.actions.select,
  onMouseLeaveAnnotation: AnnotationsStore.actions.deselect,
  actionLike: AnnotationsStore.actions.like,
  actionUnlike: AnnotationsStore.actions.unlike,
  playAnnotation: VideoPlayerStore.actions.playAnnotations,
};

const enhance = compose(
  // prettier-ignore
  connect(
    (state) => {
      return ({
        userType: UserStore.selectors.getType(state),
      })
    },
    {}
  ),
  branch((props) => !props.annotation, renderComponent(Spin)),
  connect(() => ({}), actions)
);

// TODO branch for two components

export default enhance((props: AnnotationsEditContainerProps) => {
  const {
    update,
    origin,
    onMouseEnterAnnotation,
    onMouseLeaveAnnotation,
    annotation,
  } = props;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        zIndex: 99,
      }}
    >
      <Fragment>
        <span className="videx-grid" style={{ background: 'transparent' }}>
          <HighlightPanel updateAnnotation={update} annotation={annotation} />
          <ErasePanel
            annotation={annotation}
            delete={props.delete}
            onClickHandle={props.onClickHandle}
          />
        </span>
        {origin === 'icon' && (
          <Fragment>
            <div
              onMouseEnter={onMouseEnterAnnotation}
              onMouseLeave={onMouseLeaveAnnotation}
              style={{ paddingTop: '5px' }}
            >
              <NotePanel
                updateAnnotation={update}
                annotation={annotation}
                visible={props.visible}
              />
            </div>
          </Fragment>
        )}
      </Fragment>

      <div className="videx-grid">
        <div>
          <Icon
            onClick={() => {
              props.playAnnotation([annotation]);
            }}
            name="play"
            size="large"
            className="videx-hover"
          />
        </div>
        {annotation.reaction.likeable ? (
          <Icon
            name="thumbs up outline"
            size="large"
            className="videx-hover"
            style={{
              color: annotation.color === null ? 'grey' : annotation.color,
            }}
            onClick={() => props.actionLike(annotation.id)}
          />
        ) : (
          <Icon
            name="thumbs up"
            size="large"
            className="videx-hover"
            style={{
              color: annotation.color === null ? 'grey' : annotation.color,
            }}
            onClick={() => props.actionUnlike(annotation.id)}
          />
        )}
        <p
          style={{
            color: annotation.color === null ? 'grey' : annotation.color,
          }}
        >
          {annotation.reaction.counter}
        </p>
      </div>
    </div>
  );
});
