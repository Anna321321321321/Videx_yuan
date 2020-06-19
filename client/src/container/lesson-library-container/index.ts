import InitHOC from './InitHOC';
import LessonLibrary from './LessonLibrary';
import LessonsHOC from './LessonsHOC';
import { compose } from 'recompose';

export default compose(
  InitHOC,
  LessonsHOC
)(LessonLibrary);
