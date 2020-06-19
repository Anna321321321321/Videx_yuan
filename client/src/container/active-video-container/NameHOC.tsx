import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import * as ActiveVideoStore from '../../stores/active-video-store';

interface EnhancerHOCOutterProps {}

interface EnhancerHOCInnerProps {
  lessonName: string;
}

interface mapStateToPropsProps {
  lessonName: string;
}

interface mapDispatchToPropsProps {}

export default compose(
  connect(
    state => ({
      lessonName: ActiveVideoStore.selectors.getLessonName(state)
    }),
    {}
  ),
  withProps(props => ({
    lessonName: props.lessonName
  }))
);
