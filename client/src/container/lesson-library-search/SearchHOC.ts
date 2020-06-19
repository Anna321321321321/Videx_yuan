import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import * as LessonLibraryStore from '../../stores/lesson-library-store';

interface InitHOCOutterProps {}

interface InitHOCInnerProps {
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
}

export default compose(
  connect(
    state => ({}),
    {
      search: LessonLibraryStore.actions.search,
      searchReset: LessonLibraryStore.actions.searchReset
    }
  ),
  withHandlers({
    onSearch: props => value => {
      if (value !== null && value !== '') {
        props.search(value);
      } else {
        props.searchReset();
      }
    },
    onChange: props => event => {
      if (event.target.value !== null && event.target.value !== '') {
        props.search(event.target.value);
      } else {
        props.searchReset();
      }
    }
  }),
  mapProps(props => ({
    onSearch: props.onSearch,
    onChange: _.debounce(props.onChange, 500)
  }))
);
