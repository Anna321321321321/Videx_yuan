import * as rxjs from '../../../system/rxjs';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as selectors from '../selectors';

export default (action$, store) =>
  action$
    .ofType(actionTypes.SEARCH)
    .filter(action => action.payload !== '')
    .mergeMap(action => {
      const courseId = selectors.getCourseId(store.getState());
      return rxjs.ajax
        .get(
          `/api/v4/courses/${courseId}/lessons?search=${action.payload}`,
          false
        )
        .map(value => actions.searchSuccess(value))
        .takeUntil(action$.ofType(actionTypes.SEARCH));
    });
