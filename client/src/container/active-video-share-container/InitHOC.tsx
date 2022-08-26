import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  mapProps,
  renderComponent,
  withState,
} from 'recompose';
import * as Logger from 'videx/client/logger';
import SpinPage from '../../components/spin-page';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as AnnotationStore from '../../stores/annotations-store';
import * as UserStore from '../../stores/user-store';

interface InitHOCOutterProps {
  courseId: string;
  lessonId: string;
  link: string;
}

interface InitHOCInnerProps {}

export default compose(
  connect(
    (state) => ({
      isInitialized: ActiveVideoStore.selectors.isInitialized(state),
      userType: UserStore.selectors.getType(state),
    }),
    {
      init: ActiveVideoStore.actions.init,
      deinit: ActiveVideoStore.actions.deinit,
      setPlaylists: ActiveVideoStore.actions.setPlaylists,
      getSharedAnnotations: ActiveVideoStore.actions.getAnnotationsFromLink,
      initShare: ActiveVideoStore.actions.initShare,
      initShareUpdateLink: ActiveVideoStore.actions.initShareUpdateLink,
      isShared: ActiveVideoStore.actions.isShared,
      addShareAccessor: ActiveVideoStore.actions.addShareAccessor,
      getShareAccessor: ActiveVideoStore.actions.getShareAccessor,
    }
  ),
  //withState('sharedAnnotations','getSharedAnnotations',true),
  lifecycle({
    componentDidMount() {
      Logger.event('ActiveVideo.Load', {
        courseId: this.props.courseId,
        lessonId: this.props.lessonId,
      });
      this.props.isShared();
      this.props.init(this.props.courseId, this.props.lessonId);
      // this.props.initShareUpdateLink(this.props.link);
      this.props.initShare(
        this.props.courseId,
        this.props.lessonId,
        this.props.link
      );
      this.props.setPlaylists(this.props.courseId);
      this.props.addShareAccessor(this.props.link);
      this.props.getShareAccessor(this.props.link);
    },
    componentWillUnmount() {
      Logger.event('Player.Exit');
      this.props.deinit();
    },
  }),
  branch((props) => !props.isInitialized, renderComponent(SpinPage)),
  mapProps((props) => ({
    lessonId: props.lessonId,
    courseId: props.courseId,
    userType: props.userType,
  }))
);
