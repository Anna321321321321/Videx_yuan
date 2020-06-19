import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import * as Logger from 'videx/client/logger';
import * as LessonLibraryStore from '../../../stores/lesson-library-store';
export default compose(
  connect(
    () => ({}),
    {
      del: LessonLibraryStore.actions.del
    }
  ),
  withHandlers({
    onDeleteCancel: props => () => {
      Logger.event('LessonCard.Delete.Cancel', {
        courseId: props.courseId,
        lessonId: props.lessonId
      });
    },
    onDeleteConfirm: props => () => {
      Logger.event('LessonCard.Delete.Confirm', {
        courseId: props.courseId,
        lessonId: props.lessonId
      });
      props.del(props.courseId, props.lessonId);
    },
    onDelete: props => () => () => {
      Logger.event('LessonCard.Delete.Click', {
        courseId: props.courseId,
        lessonId: props.lessonId
      });
    }
  })
);
