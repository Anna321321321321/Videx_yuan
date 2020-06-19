import { compose } from 'recompose';
import ActiveVideoContainer from './ActiveVideoContainer';
import FREHOC from './FREHOC';
import KeydownHOC from './KeydownHOC';
import NameHOC from './NameHOC';
import ResizeHOC from './ResizeHOC';
import isReadyHOC from './isReadyHOC';
import './style/index.scss';

// always need InitHOC & FREHOC & NameHOC & ResizeHOC
// KeydownHOC only active when video player is ready, also add InitMode HOC

export default compose(
  FREHOC,
  NameHOC,
  ResizeHOC,
  isReadyHOC,
  KeydownHOC
)(ActiveVideoContainer);
