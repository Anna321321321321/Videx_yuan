import { compose, branch, renderComponent, onlyUpdateForKeys } from 'recompose';

export default (PersonalDisplay, ClassDisplay) =>
  compose(
    branch(
      props => props.mode === 'personal',
      renderComponent(PersonalDisplay),
      renderComponent(ClassDisplay)
    ),
    onlyUpdateForKeys(['mode'])
  );
