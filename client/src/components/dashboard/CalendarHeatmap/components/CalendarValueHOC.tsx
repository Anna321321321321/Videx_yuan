import { compose, branch, renderComponent, onlyUpdateForKeys } from 'recompose';

export default (OverallCalendarValue, LessonCalendarValue) =>
  compose(
    branch(
      props => props.lessonFilter.length === 0,
      renderComponent(OverallCalendarValue),
      renderComponent(LessonCalendarValue)
    ),
    onlyUpdateForKeys(['lessonFilter'])
  );
