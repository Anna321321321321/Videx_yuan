import immutable, { fromJS } from 'immutable';
import React from 'react';
import { Modal } from 'antd';
import CopyText from '../../components/copy-text';
import * as actionTypes from './actionTypes';
import _ from 'lodash';

const INITIAL_STATE: immutable.Map<any, any> = fromJS({
  courseId: null,
  id: null,
  name: null,
  duration: null,
  category: null,
  transcript: {
    text: null,
    file: null,
  },
  video: {
    streaming: null,
  },
  thumbnail: {
    url: null,
    height: null,
    width: null,
    sas: null,
  },
  isInitialized: false,
  playlists: [],
  sharedAnnotations: [],
  isShared: false,
  accessedBy: [],
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return state.merge(action.payload).set('isInitialized', true);

    case actionTypes.DEINIT:
      return INITIAL_STATE;

    case actionTypes.SET_DURATION:
      return state.set('duration', action.payload.duration);
    case actionTypes.SET_PLAYLISTS:
      return state.set('playlists', action.payload.playlist);
    case actionTypes.INITSHAREUPDATELINK:
      return state.set('link', action.payload.link);
    case actionTypes.SHAREPUBLIC:
      const { link } = action.payload;
      const url2 = window.location.href + '/' + link;
      Modal.info({
        title: 'You can share your public annotations.',
        content: (
          <div>
            <CopyText text={url2} />
          </div>
        ),
      });
      // prettier-ignore
      return state;
    case actionTypes.GETAFROMLINK:
      return state.set('sharedAnnotations', action.payload.annotations);
    case actionTypes.ISSHARED:
      return state.set('isShared', true);
    case actionTypes.GETACCESSOR:
      return state.set('accessedBy', action.payload);
    default:
      return state;
  }
};
