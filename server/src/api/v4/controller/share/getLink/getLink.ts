import {
  IShare,
  ShareModel,
  AnnotationModel,
  IAnnotation,
  IReaction,
  ReactionModel,
} from 'videx/server/entities';
import { ServerError } from 'videx/server/core/error';
interface IAnnotationJson {
  id: string;
  color: string;
  text: string;
  start: number;
  end: number;
  share: boolean;
  publicForShare: boolean;
  reaction: {
    counter: number;
    likeable: boolean;
  };
  metadata: {
    editable: boolean;
  };
  editedAt: Date;
}

const find = async (
  userId: string,
  lessonId: string
): Promise<IAnnotationJson[]> =>
  (
    await Promise.all(
      (await AnnotationModel.find(userId, lessonId)).map(
        async (annotation) => await helper(userId, annotation)
      )
    )
  ).filter((annotation) => annotation != null);

const helper = async (
  userId: string,
  annotationId: IAnnotation
): Promise<IAnnotationJson> => {
  const obj = await annotationId.toObject();
  if (!obj.publicForShare) {
    return null;
  }
  const reactions: IReaction[] = await ReactionModel.find(annotationId.getId());
  // prettier-ignore
  const reaction: IReaction = await ReactionModel.findByIds(
    userId,
    annotationId.getId()
  );
  return {
    ...obj,
    reaction: {
      counter: reactions.length,
      likeable: reaction == null,
    },
    metadata: {
      editable: false,
    },
  };
};

export default async (req, res, next) => {
  try {
    const link: string = req.params.link;
    const share: IShare = await ShareModel.findByLink(link);
    res.status(200);
    if (share == null) {
      res.json(null);
    } else {
      // const annotationId: string[] = share[0].toObject().annoations;
      const userId: string = share[0].toObject().userId;
      const lessonId: string = share[0].toObject().lessonId;
      let result = [];

      // prettier-ignore
      result = [...result, ...(await find(userId,lessonId))];

      res.status(200);
      res.json(result);
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
