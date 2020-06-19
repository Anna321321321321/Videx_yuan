import { compose } from 'recompose';
import BranchHOC from './BranchHOC';
import LifeCycleHOC from './LifeCycleHOC';
import MapPropsHOC from './MapPropsHOC';
import ReducerHOC from './ReducerHOC';

export default compose(
  ReducerHOC,
  LifeCycleHOC,
  BranchHOC,
  MapPropsHOC
);
