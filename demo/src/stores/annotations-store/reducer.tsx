import { Modal } from 'antd';
import React from 'react';
import * as actionTypes from './actionTypes';
import CopyText from '../../components/copy-text';

const INITIAL_STATE = {
  annotations: [],
  selected: null,
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH:
      return {
        ...state,
        annotations: action.payload.annotations,
        loading: false
      };

    case actionTypes.ADD:
      // prettier-ignore
      return {
        ...state,
        loading: true
      };

    case actionTypes.LIKE:
    case actionTypes.UNLIKE:
    case actionTypes.REMOVE:
    case actionTypes.UPDATE:
    case actionTypes.SHARE:
      // prettier-ignore
      return {
        ...state,
        annotations: state.annotations.map((annotation) => {
          const { id } = action.payload;
          if (annotation.toObject().id !== id) {
            return annotation;
          } else {
            annotation.setLoading(true);
            return annotation;
          }
        }),
        loading: true
      };

    case actionTypes.ADDED:
      return {
        ...state,
        annotations: [...state.annotations, action.payload.annotation],
        loading: false
      };

    case actionTypes.UPDATED:
      return {
        ...state,
        annotations: state.annotations.map(annotation => {
          const { id, data } = action.payload;
          if (annotation.toObject().id !== id) {
            return annotation;
          } else {
            for (const property in data) {
              switch (property) {
                case 'color':
                  annotation.setColor(data[property]);
                  break;
                case 'text':
                  annotation.setText(data[property]);
                  break;
                case 'share':
                  annotation.setShare(data[property]);
                  break;
              }
            }
            annotation.setLoading(false);
            return annotation;
          }
        }),
        loading: false
      };

    case actionTypes.SHARED:
      const { id, data } = action.payload;
      const { token } = data;
      const url =
        window.location.href.split('/course')[0] + '/link?token=' + token;
      Modal.info({
        title: 'You can share this interval with your peers',
        content: (
          <div>
            <CopyText text={url} />
          </div>
        )
      });
      // prettier-ignore
      return {
        ...state,
        annotations: state.annotations.map((annotation) => {
          annotation.setLoading(false);
          return annotation;
        }),
        loading: false,
      }

    case actionTypes.UNLIKED:
      // prettier-ignore
      return {
        ...state,
        annotations: state.annotations.map((annotation) => {
          const { id } = action.payload;
          if (annotation.toObject().id !== id) {
            return annotation;
          } else {
            annotation.unlikeAnnotation();
            annotation.setLoading(false);
            return annotation;
          }
        }),
        loading: false,
      }

    case actionTypes.LIKED:
      // prettier-ignore
      return {
        ...state,
        annotations: state.annotations.map((annotation) => {
          const { id } = action.payload;
          if (annotation.toObject().id !== id) {
            return annotation;
          } else {
            annotation.likeAnnotation();
            annotation.setLoading(false);
            return annotation;
          }
        }),
        loading: false,
      }

    case actionTypes.REMOVED:
      // prettier-ignore
      return {
        ...state,
        annotations: state.annotations.filter(annotation => annotation.toObject().id != action.payload.id),
        loading: false
      };

    case actionTypes.SELECT:
      return {
        ...state,
        selected: action.payload.source
      };

    case actionTypes.DESELECT:
      return {
        ...state,
        selected: null
      };

    case actionTypes.DEINIT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
