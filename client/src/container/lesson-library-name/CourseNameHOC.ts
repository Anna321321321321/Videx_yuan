import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as LessonLibraryStore from '../../stores/lesson-library-store';

interface InitHOCOutterProps {}

interface InitHOCInnerProps {
  courseName: string;
}

export default compose(
  connect(
    state => ({
      courseName: LessonLibraryStore.selectors.getCourseName(state)
    }),
    {}
  )
);
