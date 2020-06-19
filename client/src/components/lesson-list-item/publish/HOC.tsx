import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import * as LessonLibraryStore from '../../../stores/lesson-library-store';

export default compose(
  connect(
    state => ({}),
    {
      onChange: LessonLibraryStore.actions.publish
    }
  ),
  withHandlers({
    onClick: props => value => {
      props.onChange(props.courseId, props.lessonId, value);
    }
  })
);
