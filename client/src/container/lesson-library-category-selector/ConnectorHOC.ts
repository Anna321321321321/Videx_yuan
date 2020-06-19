import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import * as Logger from 'videx/client/logger';
import * as LessonLibraryStore from '../../stores/lesson-library-store';

interface InitHOCOutterProps {
  children: any;
}

interface InitHOCInnerProps {
  children: any;
  selectedCategory: string;
  categories: string[];
  onChange: (value: string) => void;
}

export default compose(
  connect(
    state => ({
      selectedCategory: LessonLibraryStore.selectors.getSelectedCategory(state),
      categories: LessonLibraryStore.selectors.getCategories(state)
    }),
    {
      selectCategory: LessonLibraryStore.actions.selectCategory
    }
  ),
  withHandlers({
    onChange: props => value => {
      Logger.event('LessonLibrary.Category.Click', { category: value });
      props.selectCategory(value);
    }
  }),
  mapProps(props => ({
    children: props.children,
    selectedCategory: props.selectedCategory,
    categories: props.categories,
    onChange: props.onChange
  }))
);
