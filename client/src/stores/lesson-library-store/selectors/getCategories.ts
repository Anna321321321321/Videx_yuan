import { createSelector } from 'reselect';
import getRawLessons from './getRawLessons';

export default createSelector(getRawLessons, lessons => [
  ...new Set(
    lessons.reduce((a, lesson) => {
      a.push(lesson.category);
      return a;
    }, [])
  )
]);
