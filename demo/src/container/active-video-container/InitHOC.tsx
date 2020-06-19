import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  mapProps,
  renderComponent
} from 'recompose';
import SpinPage from '../../components/spin-page';
import * as ActiveVideoStore from '../../stores/active-video-store';

interface InitHOCOutterProps {
  courseId: string;
  lessonId: string;
}

interface InitHOCInnerProps {}

export default compose(
  connect(
    state => ({
      isInitialized: ActiveVideoStore.selectors.isInitialized(state)
    }),
    {
      init: ActiveVideoStore.actions.init,
      deinit: ActiveVideoStore.actions.deinit
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.init(this.props.courseId, this.props.lessonId);
    },
    componentWillUnmount() {
      this.props.deinit();
    }
  }),
  branch(props => !props.isInitialized, renderComponent(SpinPage)),
  mapProps(props => ({}))
);
