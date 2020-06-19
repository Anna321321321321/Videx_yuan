import React, { Fragment } from 'react';
import {
  compose,
  mapProps,
  branch,
  renderComponent,
  onlyUpdateForKeys
} from 'recompose';
import { connect } from 'react-redux';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as UserStore from '../../stores/user-store';
import ErasePanel from './ErasePanel';
import HighlightPanel from './HighlightPanel';
import NotePanel from './NotePanel';
import SharePanel from './SharePanel';
import { Icon } from 'semantic-ui-react';
import { Spin } from 'antd';

interface AnnotationsEditContainerProps {
  actionLike: (annotationId: string) => void;
  actionUnlike: (annotationId: string) => void;
  annotation: {
    id: string;
    text: string;
    share: boolean;
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
  delete: () => void;
  id: string;
  origin: string;
  update: (annotationId, object) => void;
  onMouseEnterAnnotation: (id) => void;
  onMouseLeaveAnnotation: () => void;
  onClickHandle?: () => void;
  playAnnotation: (value) => void;
  userType: number;
}

const actions = {
  update: AnnotationsStore.actions.updated,
  delete: AnnotationsStore.actions.removed,
  onMouseEnterAnnotation: AnnotationsStore.actions.select,
  onMouseLeaveAnnotation: AnnotationsStore.actions.deselect,
  actionLike: AnnotationsStore.actions.like,
  actionUnlike: AnnotationsStore.actions.unlike
  // playAnnotation: VideoPlayerStore.actions.playAnnotations
};

const enhance = compose(
  // prettier-ignore
  connect(
    (state, props) => {
      const annotation = AnnotationsStore.selectors.getAnnotations(state).find(annotation => annotation.toObject().id === props.id);
      return ({
        annotation: annotation ? annotation.toObject() : null,
        userType: UserStore.selectors.getType(state),
      })
    },
    {}
  ),
  branch(props => !props.annotation, renderComponent(Spin)),
  connect(
    () => ({}),
    actions
  ),
  onlyUpdateForKeys(['annotation'])
);

// TODO branch for two components

export default enhance((props: AnnotationsEditContainerProps) => {
  const {
    update,
    origin,
    onMouseEnterAnnotation,
    onMouseLeaveAnnotation,
    annotation
  } = props;
  return (
    <div
      style={{
        backgroundColor: '#fff',
        position: 'relative',
        width: '100%',
        zIndex: 99
      }}
    >
      {annotation.metadata.editable && (
        <Fragment>
          <div className="videx-grid">
            <HighlightPanel updateAnnotation={update} annotation={annotation} />
            {origin === 'highlight' && (
              <Fragment>
                <SharePanel
                  annotation={annotation}
                  updateAnnotation={update}
                  origin={origin}
                />
                <Icon
                  onClick={() => {
                    props.playAnnotation([annotation]);
                  }}
                  name="play"
                  size="large"
                  className="videx-hover"
                />
                <ErasePanel
                  annotation={annotation}
                  delete={props.delete}
                  onClickHandle={props.onClickHandle}
                />
              </Fragment>
            )}
          </div>
          {origin === 'icon' && (
            <Fragment>
              <div
                onMouseEnter={onMouseEnterAnnotation}
                onMouseLeave={onMouseLeaveAnnotation}
                style={{ paddingTop: '5px' }}
              >
                <NotePanel updateAnnotation={update} annotation={annotation} />
              </div>
              <Icon
                onClick={() => {
                  if (props.onClickHandle !== null) {
                    props.onClickHandle();
                  }
                }}
                style={{ right: 0, top: 0, position: 'absolute' }}
                name="remove"
                size="large"
                className="videx-hover"
              />
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 'auto' }}>
                  {props.userType !== 0 && (
                    <SharePanel
                      annotation={annotation}
                      updateAnnotation={update}
                      origin={origin}
                    />
                  )}
                  <Icon name="play" size="large" className="videx-hover" />
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <ErasePanel
                    annotation={annotation}
                    delete={props.delete}
                    onClickHandle={props.onClickHandle}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      {!annotation.metadata.editable && (
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
                color: annotation.color === null ? 'grey' : annotation.color
              }}
              onClick={() => props.actionLike(annotation.id)}
            />
          ) : (
            <Icon
              name="thumbs up"
              size="large"
              className="videx-hover"
              style={{
                color: annotation.color === null ? 'grey' : annotation.color
              }}
              onClick={() => props.actionUnlike(annotation.id)}
            />
          )}
          {props.origin !== 'highlight' && (
            <Icon
              onClick={() => {
                if (props.onClickHandle !== null) {
                  props.onClickHandle();
                }
              }}
              style={{ right: 0, top: 0, position: 'absolute' }}
              name="remove"
              size="large"
              className="videx-hover"
            />
          )}
          <p
            style={{
              color: annotation.color === null ? 'grey' : annotation.color
            }}
          >
            {annotation.reaction.counter}
          </p>
        </div>
      )}
    </div>
  );
});
