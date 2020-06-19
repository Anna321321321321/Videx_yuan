import { connect } from 'react-redux';
import {
  compose,
  lifecycle,
  mapProps,
  renderComponent,
  withHandlers,
  withState
} from 'recompose';
import * as ActiveVideoStore from '../../stores/active-video-store';
import { ExportStatus } from './constants';

export default compose(
  connect(
    state => ({
      courseId: ActiveVideoStore.selectors.getCourseId(state),
      lessonId: ActiveVideoStore.selectors.getLessonId(state)
    }),
    {}
  ),
  withState<any, ExportStatus, '_status', '_setStatus'>(
    '_status',
    '_setStatus',
    ExportStatus.Init
  ),
  withHandlers(() => {
    return {
      _onClickExportOneNote: props => () => {
        props._setStatus(ExportStatus.Processing);
      },
      _onCancelProcessing: props => () => props._setStatus(ExportStatus.Init)
    };
  }),
  mapProps(props => ({
    status: props._status,
    pdfLink: `/api/v4/courses/${props.courseId}/lessons/${
      props.lessonId
    }/downloads/pdf`,
    onClickExportOneNote: props._onClickExportOneNote,
    onCancelProcessing: props._onCancelProcessing
  }))
);
