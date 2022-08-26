import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Button, Dropdown } from 'antd';
import * as AnnotationsStore from '../../stores/annotations-store';
import * as ActiveVideoStore from '../../stores/active-video-store';

interface ShareAnnotationContainerProps {
  selectPrivate: () => void;
  sharePublicParent: (courseId: string, lessonId: string) => void;
  courseId: string;
  lessonId: string;
}

const mapDispatchToProps = {
  selectPrivate: AnnotationsStore.actions.ableSelectPrivate,
  sharePublicParent: ActiveVideoStore.actions.sharePublic,
};
const mapStateToProps = (state) => ({
  courseId: ActiveVideoStore.selectors.getCourseId(state),
  lessonId: ActiveVideoStore.selectors.getLessonId(state),
});

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance((props: ShareAnnotationContainerProps) => {
  return (
    <div>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <a onClick={props.selectPrivate}>Select private annotations</a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => {
                  props.sharePublicParent(props.courseId, props.lessonId);
                }}
              >
                Share public annotations
              </a>
            </Menu.Item>
          </Menu>
        }
      >
        <Button type="primary" className="share-annotation-button">Share Annotations
        </Button>
      </Dropdown>
    </div>
  );
});

