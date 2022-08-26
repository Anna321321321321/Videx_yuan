import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  mapProps,
  renderComponent,
  withState
} from 'recompose';
import * as Logger from 'videx/client/logger';
import SpinPage from '../../components/spin-page';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as UserStore from '../../stores/user-store';

interface InitHOCOutterProps {
  courseId: string;
  lessonId: string;
}

interface InitHOCInnerProps {}

export default compose(
  connect(
    state => ({
      isInitialized: ActiveVideoStore.selectors.isInitialized(state),
      userType: UserStore.selectors.getType(state)
    }),
    {
      init: ActiveVideoStore.actions.init,
      deinit: ActiveVideoStore.actions.deinit,
      setPlaylists: ActiveVideoStore.actions.setPlaylists
    }
  ),
  withState('sharedAnnotations','getSharedAnnotations',false),
  lifecycle({
    componentDidMount() {
      Logger.event('ActiveVideo.Load', {
        courseId: this.props.courseId,
        lessonId: this.props.lessonId
      });
      this.props.init(this.props.courseId, this.props.lessonId);
      this.props.setPlaylists(this.props.courseId);
    },
    componentWillUnmount() {
      Logger.event('Player.Exit');
      this.props.deinit();
    }
  }),
  branch(props => !props.isInitialized, renderComponent(SpinPage)),
  mapProps(props => ({
    lessonId: props.lessonId,
    courseId: props.courseId,
    userType: props.userType
  }))
);
