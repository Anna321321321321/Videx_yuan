import { compose, branch, renderComponent, onlyUpdateForKeys } from 'recompose';

export default (LessonListItem, LessonDetailedItem) =>
  compose(
    branch(
      props => props.analyticsMode === true,
      renderComponent(LessonDetailedItem),
      renderComponent(LessonListItem)
    ),
    onlyUpdateForKeys(['analyticsMode'])
  );
