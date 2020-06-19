import { withReducer } from 'recompose';

interface HOCReducer {
  status: 'success' | 'exception' | 'active';
  link: string | null;
}

export default withReducer(
  'reducer',
  'dispatch',
  (state: HOCReducer, action): HOCReducer => {
    switch (action.type) {
      case 'ERROR':
        return {
          ...state,
          status: 'exception'
        };
      case 'SUCCESS':
        return {
          ...state,
          status: 'success',
          link: action.payload
        };
      default:
        return state;
    }
  },
  <HOCReducer>{
    status: 'active',
    link: null
  }
);
