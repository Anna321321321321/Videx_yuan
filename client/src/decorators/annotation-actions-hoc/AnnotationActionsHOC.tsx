import { Spin } from 'antd';
import { connect } from 'react-redux';
import {
  branch,
  compose,
  mapProps,
  renderComponent,
  withHandlers
} from 'recompose';
import * as AnnotationsStore from '../../stores/annotations-store';

export default compose(
  // prettier-ignore
  connect(
    (state, props) => {
      const annotation = AnnotationsStore.selectors.getAnnotations(state).find(annotation => annotation.toObject().id === props.id);
      return ({
        annotation: annotation ? annotation.toObject() : null,
      })
    },
    {}
  ),
  branch(props => !props.annotation, renderComponent(Spin)),
  connect(
    () => ({}),
    {
      actionUpdate: AnnotationsStore.actions.update,
      actionRemove: AnnotationsStore.actions.remove,
      actionLike: AnnotationsStore.actions.like,
      actionUnlike: AnnotationsStore.actions.unlike,
      actionShare: AnnotationsStore.actions.share
    }
  ),
  withHandlers({
    onRemove: props => () => {
      props.actionRemove(props.annotation.id);
    },
    onToggleLike: props => () => {
      if (props.annotation.reaction.likeable) {
        props.actionLike(props.annotation.id);
      } else {
        props.actionUnlike(props.annotation.id);
      }
    },
    onToggleShare: props => () => {
      if (props.annotation.share) {
        props.actionUpdate(props.annotation.id, { share: false });
      } else {
        props.actionUpdate(props.annotation.id, { share: true });
      }
    },
    onTogglePublicForShare: props => () => {
      if (props.annotation.publicForShare==false) {
        props.actionUpdate(props.annotation.id, { publicForShare: false });
      } else {
        props.actionUpdate(props.annotation.id, { publicForShare: true });
      }
    },
    onUpdateColor: props => color => {
      props.actionUpdate(props.annotation.id, {
        color: color === '#ffffff' ? null : color
      });
    },
    onUpdateText: props => text => {
      props.actionUpdate(props.annotation.id, { text: text });
    },
    onLink: props => () => {
      props.actionShare(props.annotation.id, {
        start: props.annotation.start,
        end: props.annotation.end
      });
    }
  }),
  mapProps(props => ({
    annotation: props.annotation,
    updateColor: props.onUpdateColor,
    updateText: props.onUpdateText,
    toggleShare: props.onToggleShare,
    toggleLike: props.onToggleLike,
    remove: props.onRemove,
    link: props.onLink
  }))
);
