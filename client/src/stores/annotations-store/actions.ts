import Annotation from './Annotation';
import * as actionTypes from './actionTypes';
import * as Logger from 'videx/client/logger';

export const fetch = (annotations) => ({
  payload: { annotations },
  type: actionTypes.FETCH,
});

export const deinit = () => ({ type: actionTypes.DEINIT });

/*
export const initShare = (link: string) => dispatch => APICaller.get();
 {
 const _annotations = ;
 return {
 payload: { annotations },
 type: actionTypes.INITSHARE, 
};
};
*/

export const add = (annotation: Annotation) => {
  return { payload: { annotation }, type: actionTypes.ADD };
};
export const added = (annotation: Annotation) => {
  const annotationObject = annotation.toObject();
  Logger.event('Annotation.Add', {
    annotationId: annotationObject.id,
    annotationText: annotationObject.text,
    annotationColor: annotationObject.color,
    annotationStart: annotationObject.start,
    annotationEnd: annotationObject.end,
    annotationTranscript: annotationObject.transcript,
  });
  return { payload: { annotation }, type: actionTypes.ADDED };
};

export const remove = (id: string) => {
  return { payload: { id }, type: actionTypes.REMOVE };
};
export const removed = (id: string) => {
  Logger.event('Annotation.Remove', { annotation: id });
  return { payload: { id }, type: actionTypes.REMOVED };
};

export const update = (
  id: string,
  data: {
    text?: string;
    color?: string;
    share?: boolean;
    publicForShare?: boolean;
  }
) => {
  Logger.event('Annotation.Update', {
    annotationId: id,
    annotationText: data.text,
    annotationColor: data.color,
    annotationShare: data.share,
    annotationPublicForShare: data.publicForShare,
  });
  return { payload: { id, data }, type: actionTypes.UPDATE };
};
export const updated = (
  id: string,
  data: {
    text?: string;
    color?: string;
    share?: boolean;
    annotationPublicForShare: boolean;
  }
) => {
  return { payload: { id, data }, type: actionTypes.UPDATED };
};

// like & unlike annotation
export const like = (id: string) => {
  Logger.event('Annotation.Like', { id: id });
  return { payload: { id }, type: actionTypes.LIKE };
};
export const liked = (id: string) => {
  return { payload: { id }, type: actionTypes.LIKED };
};
export const unlike = (id: string) => {
  Logger.event('Annotation.Unlike', { id: id });
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
  Logger.event('Annotation.ShareInterval', {
    start: data.start,
    end: data.end,
    source: data.source,
  });
  return { payload: { id, data }, type: actionTypes.SHARE };
};

export const shared = (id: string, data: { token }) => {
  return { payload: { id, data }, type: actionTypes.SHARED };
};
export const sharedAnnotation = (id: string, data: { token }) => {
  return { payload: { id, data }, type: actionTypes.SHAREDANNOTATION };
};

export const ableSelectPrivate = () => {
  Logger.event('ableSelectPrivate');
  return { type: actionTypes.ABLESELECTPRIVATEANNOTATION };
};
export const disableSelectPrivate = () => {
  Logger.event('disableSelectPrivate');
  return { type: actionTypes.DISABLESELECTPRIVATEANNOTATION };
};
/*export const selectPrivate = () => {
  Logger.event('ableSelectPrivate');
  return { type: actionTypes.SELECTPRIVATEANNOTATION };
};*/
export const select = (source) => {
  return { type: actionTypes.SELECT, payload: { source } };
};
export const deselect = () => ({ type: actionTypes.DESELECT });
