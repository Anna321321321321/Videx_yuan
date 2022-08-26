import { connect } from 'react-redux';
import {
  compose,
  lifecycle,
  mapProps,
  renderComponent,
  withHandlers,
  withState,
} from 'recompose';
import * as ActiveVideoStore from '../../stores/active-video-store';
import APICaller from '../../system/api-caller';
import { ShareStatus } from './constants';
import * as Logger from 'videx/client/logger';

export default compose(
  connect(
    (state) => ({
      courseId: ActiveVideoStore.selectors.getCourseId(state),
      lessonId: ActiveVideoStore.selectors.getLessonId(state),
    }),
    {}
  ),
  withState<any, ShareStatus, '_status', '_setStatus'>(
    '_status',
    '_setStatus',
    ShareStatus.Init
  ),
  withHandlers(() => {
    return {
      _onClickExportOneNote: (props) => () => {
        props._setStatus(ShareStatus.Processing);
        // prettier-ignore
        Logger.event('Export.Annotations.OneNote');
        APICaller.get(
          `/api/v4/courses/${props.courseId}/lessons/${props.lessonId}/downloads/onenote`,
          () => props._setStatus(ShareStatus.Success),
          () => props._setStatus(ShareStatus.Error)
        );
      },
      _onCancelProcessing: (props) => () => props._setStatus(ShareStatus.Init),
    };
  }),
  mapProps((props) => ({
    status: props._status,
    pdfLink: `/api/v4/courses/${props.courseId}/lessons/${props.lessonId}/downloads/pdf`,
    onClickExportOneNote: props._onClickExportOneNote,
    onCancelProcessing: props._onCancelProcessing,
  }))
);
