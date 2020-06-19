import { Input } from 'antd';
import React, { Fragment } from 'react';
import LessonLibraryName from '../../container/lesson-library-name';
import LessonLibrarySearch from '../../container/lesson-library-search';
import WeekSelector from '../../container/lesson-library-week-selector';

export default props => (
  <Fragment>
    <LessonLibraryName lessonCount={props.lessonCount} />
    <div
      style={{
        margin: '10px 0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          marginRight: '15%'
        }}
      >
        <LessonLibrarySearch />
      </div>
      <WeekSelector />
    </div>
  </Fragment>
);
