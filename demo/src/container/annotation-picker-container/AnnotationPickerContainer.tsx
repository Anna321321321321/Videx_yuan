import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as AnnotationSelectSectionStore from '../../stores/annotation-select-section-store';
import * as AnnotationsStore from '../../stores/annotations-store';
import HighlightPanel from './HighlightPanel';
import BookmarkContainer from './BookmarkContainer';

interface AnnotationPickerContainerProps {
  annotationSelectSection: {
    start: number;
    end: number;
  };
  ids: {
    courseId: string;
    lessonId: string;
  };
  closeAnnotationPicker?: () => void;
  addAnnotation: (annotation: AnnotationsStore.Annotation) => void;
  shareInterval: (id, data) => void;
  annotationSource: 'filmstrip' | 'transcript';
}

class AnnotationPickerContainer extends Component<
  AnnotationPickerContainerProps,
  null
> {
  render() {
    const { annotationSelectSection, annotationSource } = this.props;
    return (
      <div
        style={{
          backgroundColor: '#fff'
        }}
      >
        <HighlightPanel
          addAnnotation={this.props.addAnnotation}
          annotationSelectSection={annotationSelectSection}
          closeAnnotationPicker={this.props.closeAnnotationPicker}
        />
        <BookmarkContainer
          addAnnotation={this.props.addAnnotation}
          annotationSelectSection={annotationSelectSection}
          closeAnnotationPicker={this.props.closeAnnotationPicker}
        />
        <Icon
          name="linkify"
          size="large"
          className="videx-hover"
          style={{ color: 'grey' }}
          onClick={() => {
            this.props.shareInterval(null, {
              start: annotationSelectSection.start,
              end: annotationSelectSection.end,
              source: annotationSource
            });
          }}
        />
        <Icon
          className="annotation-close videx-hover"
          name="remove"
          size="large"
          onClick={() => {
            this.props.closeAnnotationPicker();
          }}
          style={{ color: 'grey' }}
        />
      </div>
    );
  }
}

const actions = {
  addAnnotation: AnnotationsStore.actions.added,
  closeAnnotationPicker: AnnotationSelectSectionStore.actions.cancel,
  shareInterval: AnnotationsStore.actions.share
};

const mapStateToProps = state => ({
  annotationSelectSection: AnnotationSelectSectionStore.selectors.getSelectSection(
    state
  ),
  annotationSource: AnnotationSelectSectionStore.selectors.getSource(state),
  ids: ActiveVideoStore.selectors.getIds(state)
});

export default connect(
  mapStateToProps,
  actions
)(AnnotationPickerContainer);
