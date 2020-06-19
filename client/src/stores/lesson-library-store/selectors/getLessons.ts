import moment from 'moment';
import { createSelector } from 'reselect';
import getMetadata from './getMetadata';
import getRawLessons from './getRawLessons';
import getSearched from './getSearched';
import getSelectedCategory from './getSelectedCategory';
import getSelectedWeek from './getSelectedWeek';
import isInitialized from './isInitialized';

export default createSelector(
  getRawLessons,
  getMetadata,
  getSelectedWeek,
  getSelectedCategory,
  getSearched,
  isInitialized,
  (
    lessons,
    metadata,
    selectedWeek,
    selectedCategory,
    searchedLessons,
    isInitialized
  ) => {
    if (!isInitialized) {
      return null;
    }
    return (
      // prettier-ignore
      lessons
        .filter(lesson => {
          if (!selectedWeek) {
            return true;
          } else {
            // prettier-ignore
            const start = moment(metadata.releaseDate).add((selectedWeek - 1) * 7, 'days');
            // prettier-ignore
            const end = moment(metadata.releaseDate).add(selectedWeek * 7, 'days').subtract(1, 'milliseconds');
            return (
              moment(lesson.releaseDate) >= start &&
              moment(lesson.releaseDate) <= end
            );
          }
        })
        .filter(lesson => selectedCategory === 'all' ? true : lesson.category === selectedCategory)
        .filter(lesson => searchedLessons === null ? true : searchedLessons.includes(lesson.id))
    );
  }
);
