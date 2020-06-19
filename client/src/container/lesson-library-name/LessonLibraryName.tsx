import { Input } from 'antd';
import React, { Fragment } from 'react';
import WeekSelector from '../../container/lesson-library-week-selector';

type LessonLibraryHeaderProps = {
  courseName: string;
  lessonCount: number;
};

export default (props: LessonLibraryHeaderProps) => (
  <h1>
    {props.courseName}({props.lessonCount} Videos)
  </h1>
);
