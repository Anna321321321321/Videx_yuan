import React, { Component } from 'react';
import Delete from './delete';
import Edit from './edit';
import Publish from './publish';
import Link from './link';

interface ActionProps {
  courseId: string;
  lessonId: string;
  publish: boolean;
  adminAccess: boolean;
}

export default (props: ActionProps) => {
  if (props.adminAccess) {
    return [
      <Delete
        key="delete"
        courseId={props.courseId}
        lessonId={props.lessonId}
      />,
      <Publish
        key="publish"
        courseId={props.courseId}
        lessonId={props.lessonId}
        publish={props.publish}
      />,
      <Edit key="edit" courseId={props.courseId} lessonId={props.lessonId} />,
      <Link courseId={props.courseId} lessonId={props.lessonId} />
    ];
  } else {
    return null;
  }
};
