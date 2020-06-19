import Annotation from './Annotation';
import * as actionTypes from './actionTypes';

export const fetch = annotations => ({
  payload: { annotations },
  type: actionTypes.FETCH
});

export const deinit = () => ({ type: actionTypes.DEINIT });

export const add = (annotation: Annotation) => {
  return { payload: { annotation }, type: actionTypes.ADD };
};
export const added = (annotation: Annotation) => {
  const annotationObject = annotation.toObject();
  return { payload: { annotation }, type: actionTypes.ADDED };
};

export const remove = (id: string) => {
  return { payload: { id }, type: actionTypes.REMOVE };
};
export const removed = (id: string) => {
  return { payload: { id }, type: actionTypes.REMOVED };
};

export const update = (
  id: string,
  data: {
    text?: string;
    color?: string;
    share?: boolean;
  }
) => {
  return { payload: { id, data }, type: actionTypes.UPDATE };
};
export const updated = (
  id: string,
  data: {
    text?: string;
    color?: string;
    share?: boolean;
  }
) => {
  return { payload: { id, data }, type: actionTypes.UPDATED };
};

// like & unlike annotation
export const like = (id: string) => {
  return { payload: { id }, type: actionTypes.LIKE };
};
export const liked = (id: string) => {
  return { payload: { id }, type: actionTypes.LIKED };
};
export const unlike = (id: string) => {
  return { payload: { id }, type: actionTypes.UNLIKE };
};
export const unliked = (id: string) => {
  return { payload: { id }, type: actionTypes.UNLIKED };
};

// generate link
export const share = (
  id: string,
  data: { start: number; end: number; source: string }
) => {
  return { payload: { id, data }, type: actionTypes.SHARE };
};
export const shared = (id: string, data: { token }) => {
  return { payload: { id, data }, type: actionTypes.SHARED };
};

export const select = source => {
  return { type: actionTypes.SELECT, payload: { source } };
};
export const deselect = () => ({ type: actionTypes.DESELECT });
