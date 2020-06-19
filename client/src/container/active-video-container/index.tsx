import { compose } from 'recompose';
import ActiveVideoContainer from './ActiveVideoContainer';
import FREHOC from './FREHOC';
import InitHOC from './InitHOC';
import KeydownHOC from './KeydownHOC';
import NameHOC from './NameHOC';
import ResizeHOC from './ResizeHOC';
import isReadyHOC from './isReadyHOC';
import './style/index.scss';
import CategoryHOC from './CategoryHOC';
import AnnotationsHOC from './AnnotationsHOC';

// always need InitHOC & FREHOC & NameHOC & ResizeHOC
// KeydownHOC only active when video player is ready, also add InitMode HOC

export default compose(
  InitHOC,
  FREHOC,
  NameHOC,
  ResizeHOC,
  isReadyHOC,
  KeydownHOC,
  CategoryHOC,
  AnnotationsHOC
)(ActiveVideoContainer);
