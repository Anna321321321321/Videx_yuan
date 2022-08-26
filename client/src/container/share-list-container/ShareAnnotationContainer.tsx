import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { Button, Modal } from 'antd';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as ActiveVideoStore from '../../stores/active-video-store';

interface ShareAnnotationContainerProps {
  selectPrivate: () => void;
  sharePublicParent: (courseId: string, lessonId: string) => void;
  // getAccessor: () => string[];
  courseId: string;
  lessonId: string;
  visible: boolean;
  setvisible(visible: boolean): void;
  list: string[];
}

const mapDispatchToProps = {
  selectPrivate: AnnotationsStore.actions.ableSelectPrivate,
  sharePublicParent: ActiveVideoStore.actions.sharePublic,
  // getAccessor: ActiveVideoStore.actions.getShareAccessor,
};
const mapStateToProps = (state) => ({
  courseId: ActiveVideoStore.selectors.getCourseId(state),
  lessonId: ActiveVideoStore.selectors.getLessonId(state),
  list: ActiveVideoStore.selectors.getSharedList(state),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('visible', 'setvisible', false)
);
export default enhance((props: ShareAnnotationContainerProps) => {
  var _visible: boolean;
  // const showModal = () => {
  //   _visible = true;
  // };

  const handleOk = (e) => {
    console.log(e);
    props.setvisible(false);
  };
  // const list = props.getAccessor();
  // const list = null;
  return (
    <div>
      <Button
        type="primary"
        className="share-annotation-button"
        onClick={() => {
          props.setvisible(true);
        }}
      >
        Share List
      </Button>
      <Modal
        title="Share list"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <div>
          {props.list.map((i) => {
            return <p>{i}</p>;
          })}
        </div>
      </Modal>
    </div>
  );
});
// export default connect(null, mapDispatchToProps)(SelectPrivateContainer);
