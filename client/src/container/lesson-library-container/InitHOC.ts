import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  withProps,
  renderComponent
} from 'recompose';
import * as Logger from 'videx/client/logger';
import SpinPage from '../../components/spin-page';
import * as LessonLibraryStore from '../../stores/lesson-library-store';

interface InitHOCOutterProps {
  courseId: string;
}

interface InitHOCInnerProps {
  courseId: string;
}

export default compose(
  connect(
    state => ({
      isInitialized: LessonLibraryStore.selectors.isInitialized(state)
    }),
    {
      init: LessonLibraryStore.actions.init,
      deinit: LessonLibraryStore.actions.deinit
    }
  ),
  lifecycle({
    componentDidMount() {
      Logger.event('LessonLibrary.Load', { courseId: this.props.courseId });
      this.props.init(this.props.courseId);
    },
    componentWillUnmount() {
      this.props.deinit();
    }
  }),
  branch(props => !props.isInitialized, renderComponent(SpinPage)),
  withProps(props => ({
    courseId: props.courseId
  }))
);
