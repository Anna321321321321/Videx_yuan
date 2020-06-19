import React, { Fragment } from 'react';
import {
  compose,
  branch,
  renderComponent
} from 'recompose';
import { connect } from 'react-redux';
import * as AnnotationsStore from '../../../stores/annotations-store';
import * as VideoPlayerStore from '../../../stores/video-player-store';
import ErasePanel from './ErasePanel';
import HighlightPanel from './HighlightPanel';
import NotePanel from './NotePanel';
import { Spin } from 'antd';
import { TColorHex } from '../../../core/color/types';

interface AnnotationsEditContainerProps {
  annotation: {
    id: string;
    text: string;
    share: boolean;
    color: TColorHex;
    loading: boolean;
    start: number;
    end: number;
    transcript: string;
  };
  id: string;
  origin: string;
  onMouseEnterAnnotation: (id) => void;
  onMouseLeaveAnnotation: () => void;
  onClickHandle?: () => void;
  playAnnotation: (value) => void;
}

const actions = {
  onMouseEnterAnnotation: AnnotationsStore.actions.select,
  onMouseLeaveAnnotation: AnnotationsStore.actions.deselect,
  playAnnotation: VideoPlayerStore.actions.playAnnotations
};

const enhance = compose(
  branch(props => !props.annotation, renderComponent(Spin)),
  connect(
    () => ({}),
    actions
  )
);

// TODO branch for two components

export default enhance((props: AnnotationsEditContainerProps) => {
  const {
    origin,
    onMouseEnterAnnotation,
    onMouseLeaveAnnotation,
    annotation
  } = props;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        zIndex: 99
      }}
    >
      <Fragment>
        <span className="videx-grid" style={{ background: 'transparent' }}>
          <HighlightPanel annotation={annotation} />
          <ErasePanel
            annotation={annotation}
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
                annotation={annotation}
                visible={true}
              />
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
});
