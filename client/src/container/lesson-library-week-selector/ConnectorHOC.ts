import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import * as Logger from 'videx/client/logger';
import * as LessonLibraryStore from '../../stores/lesson-library-store';

interface InitHOCOutterProps {}

interface InitHOCInnerProps {
  weeks: string[];
  onChange: (value: string) => void;
}

export default compose(
  connect(
    state => ({
      weeks: LessonLibraryStore.selectors.getWeeks(state)
    }),
    {
      selectWeek: LessonLibraryStore.actions.selectWeek
    }
  ),
  withHandlers({
    onChange: props => value => {
      Logger.event('LessonHeader.Week.Click');
      props.selectWeek(value);
    }
  }),
  mapProps(props => ({
    weeks: props.weeks,
    onChange: props.onChange
  }))
);
