import { compose, lifecycle, mapProps } from 'recompose';

export default compose(
  lifecycle({
    componentDidMount() {
      const { dispatch, link } = this.props;
      dispatch({ type: 'SUCCESS', payload: 'value.urladadad' });
      // APICaller.post(
      //   '/api/v4/links',
      //   {
      //     url: link
      //   },
      //   (value: any) => ,
      //   () => dispatch({ type: 'ERROR' })
      // );
    }
  }),
  mapProps(props => ({
    link: props.reducer.link,
    status: props.reducer.status
  }))
);
