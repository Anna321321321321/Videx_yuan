import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  IAnnotation,
  ICourse,
  ILesson,
  IReaction,
  IUser,
  ReactionModel
} from 'videx/server/entities';

interface IAnnotationJson {
  id: string;
  color: string;
  text: string;
  start: number;
  end: number;
  share: boolean;
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
  user: IUser,
  userId: string,
  lessonId: string,
  owner: boolean
): Promise<IAnnotationJson[]> =>
  (await Promise.all(
    (await AnnotationModel.find(userId, lessonId)).map(
      async annotation => await helper(user, annotation, owner)
    )
  )).filter(annotation => annotation != null);

const helper = async (
  user: IUser,
  annotation: IAnnotation,
  own: boolean
): Promise<IAnnotationJson> => {
  const obj = annotation.toObject();
  if (!own && !obj.share) {
    return null;
  }
  const reactions: IReaction[] = await ReactionModel.find(annotation.getId());
  // prettier-ignore
  const reaction: IReaction = await ReactionModel.findByIds(user.getId(), annotation.getId());
  return {
    ...obj,
    reaction: {
      counter: reactions.length,
      likeable: !own ? reaction == null : false
    },
    metadata: {
      editable: own
    }
  };
};

export default async (req, res, next) => {
  try {
    const user: IUser = res.locals.videx.user;
    const course: ICourse = res.locals.videx.course;
    const lesson: ILesson = res.locals.videx.lesson;

    let result = [];

    // prettier-ignore
    result = [
      ...result,
      ...!course.isOwner(user.getId()) ? await find(user, course.getUserId(), lesson.getId(), false) : [],
    ];

    // prettier-ignore
    result = [
      ...result,
      ...(await find(user, user.getId(), lesson.getId(), true))
    ];

    res.status(200);
    res.json(result);
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
