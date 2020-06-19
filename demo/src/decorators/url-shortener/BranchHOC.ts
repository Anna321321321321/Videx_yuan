import { branch, renderComponent, renderNothing } from 'recompose';
import Error from './Error';
import Loading from './Loading';

export default branch(
  props => props.status === 'active',
  renderComponent(Loading),
  branch(props => props.status === 'exception', renderComponent(Error))
);
