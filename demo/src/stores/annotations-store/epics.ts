import * as rxjs from '../../system/rxjs';
import * as ActiveVideoStore from '../active-video-store';
import Annotation from './Annotation';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

const helper = (annotation: Annotation, transcript) => {
  const text = transcript
    .map(transcript => {
      const helper = ({ start, end, text }) => {
        const textArray = text.split(' ');
        const length = textArray.length;
        const interval: number = (end - start) / length;
        return textArray.map((text, i) => ({
          text,
          start: Number((start + interval * i).toFixed(3)),
          end: Number((start + interval * (i + 1)).toFixed(3))
        }));
      };
      return helper(transcript);
    })
    .reduce(
      (aggregator: { text: string; start: number; end: number }[], value) => [
        ...aggregator,
        ...value
      ],
      []
    )
    .filter(
      value =>
        value.start >= annotation.toObject().start &&
        value.end <= annotation.toObject().end
    )
    .reduce((aggregator, value) => aggregator + ' ' + value.text, '')
    .substring(1);
  annotation.setTranscript(text);
};

// export const fetchEpic = (action$, store) =>
//   action$
//     .ofType(ActiveVideoStore.actionTypes.INIT)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(() => {
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       const transcript = ActiveVideoStore.selectors.getTranscriptText(
//         store.getState()
//       );
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .get(`/api/v4/courses/${courseId}/lessons/${lessonId}/annotations`)
//           .map(annotations => actions.fetch(annotations.map(annotation => {
//             const instance = Annotation.fromServer(annotation);
//             helper(instance, transcript);
//             return instance;
//           })))
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

// export const addEpic = (action$, store) =>
//   action$
//     .ofType(actionTypes.ADD)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(action => {
//       const annotation: Annotation = action.payload.annotation;
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       const transcript = ActiveVideoStore.selectors.getTranscriptText(
//         store.getState()
//       );
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .post(`/api/v4/courses/${courseId}/lessons/${lessonId}/annotations`, annotation.toServer())
//           .map(({ id }) => {
//             annotation.setId(id);
//             helper(annotation, transcript);
//             return actions.added(annotation);
//           })
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

// export const removeEpic = (action$, store) =>
//   action$
//     .ofType(actionTypes.REMOVE)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(action => {
//       const { id } = action.payload;
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .del(`/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}`)
//           .map(() => actions.removed(id))
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

// export const updateEpic = (action$, store) =>
//   action$
//     .ofType(actionTypes.UPDATE)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(action => {
//       const { id, data } = action.payload;
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .put(`/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}`, data)
//           .map(() => actions.updated(id, data))
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

// export const likeEpic = (action$, store) =>
//   action$
//     .ofType(actionTypes.LIKE)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(action => {
//       const { id } = action.payload;
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .post(`/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}/reactions/create`, {})
//           .map(() => actions.liked(id))
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

// export const unlikeEpic = (action$, store) =>
//   action$
//     .ofType(actionTypes.UNLIKE)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(action => {
//       const { id } = action.payload;
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .del(`/api/v4/courses/${courseId}/lessons/${lessonId}/annotations/${id}/reactions/remove`)
//           .map(() => actions.unliked(id))
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

// export const shareEpic = (action$, store) =>
//   action$
//     .ofType(actionTypes.SHARE)
//     .filter(() => ActiveVideoStore.selectors.getIds(store.getState()) !== null)
//     .mergeMap(action => {
//       const { id, data } = action.payload;
//       const { start, end } = data;
//       // prettier-ignore
//       const { courseId, lessonId } = ActiveVideoStore.selectors.getIds(store.getState());
//       return (
//         // prettier-ignore
//         rxjs.ajax
//           .post(`/api/v4/courses/${courseId}/lessons/${lessonId}/links`, { start, end })
//           .map(({ token }) => actions.shared(id, { token }))
//           .catch(ErrorHandleStore.actions.sendNotification)
//       );
//     });

export const deinitEpic = action$ =>
  action$
    .ofType(ActiveVideoStore.actionTypes.DEINIT)
    .map(() => actions.deinit());
