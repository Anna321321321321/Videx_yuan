import { createSelector } from 'reselect';
import getCourseId from './getCourseId';
import getLessonId from './getLessonId';

export default createSelector(
  getCourseId,
  getLessonId,
  (courseId, lessonId) => (courseId && lessonId ? { courseId, lessonId } : null)
);
