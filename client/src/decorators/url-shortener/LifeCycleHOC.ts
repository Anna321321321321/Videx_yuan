import { compose, lifecycle, mapProps } from 'recompose';
import APICaller from '../../system/api-caller';

export default compose(
  lifecycle({
    componentDidMount() {
      const { dispatch, link } = this.props;
      APICaller.post(
        '/api/v4/links',
        {
          url: link
        },
        (value: any) => dispatch({ type: 'SUCCESS', payload: value.url }),
        () => dispatch({ type: 'ERROR' })
      );
    }
  }),
  mapProps(props => ({
    link: props.reducer.link,
    status: props.reducer.status
  }))
);
