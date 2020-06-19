import { ServerError } from 'videx/server/core/error';
import {
  AnnotationModel,
  HistoryModel,
  ICourse,
  IUser,
  LessonModel
} from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const course: ICourse = res.locals.videx.course;
    const user: IUser = res.locals.videx.user;

    const response = {
      metadata: {
        id: course.getId(),
        name: course.getName(),
        releaseDate: course.getReleaseDate(),
        adminAccess:
          user.isGlobalAdministrator() || course.isOwner(user.getId())
      },
      lessons: [],
      subscribers: course.getSubscribers().length
    };

    response.lessons = (await Promise.all(
      (await LessonModel.find({ courseId: course.getId() })).map(
        async lesson => {
          if (
            !user.isGlobalAdministrator() &&
            course.isSubscriber(user.getId()) &&
            (!lesson.getPublish() || lesson.getStatus() !== 4)
          ) {
            return null;
          }

          const history = await HistoryModel.findById(
            user.getId(),
            lesson.getId()
          );

          const annotations = (await AnnotationModel.find(user.getId(), lesson.getId()))
            .map(annotation => ({
              ...annotation.toObject(),
              streamingUrl: lesson.toObject().video.streaming,
              thumbnail: lesson.toObject().thumbnail,
              courseId: course.getId(),
              lessonId: lesson.getId(),
            }));

          return {
            id: lesson.getId(),
            name: lesson.getName(),
            summary: lesson.getSummary(),
            status: lesson.getStatus(),
            releaseDate: lesson.getReleaseDate(),
            category: lesson.getCategory(),
            preview: lesson.getStatus() === 4 ? lesson.getPreview() : null,
            duration: lesson.getStatus() === 4 ? lesson.getDuration() : null,
            publish:
              course.isOwner(user.getId()) || user.isGlobalAdministrator()
                ? lesson.getPublish()
                : null,
            history:
              lesson.getStatus() === 4
                ? {
                  watched: !!history,
                  counter: history ? history.getCounter() : null,
                  date: history ? history.getDate() : null,
                  playhead: history ? history.getPlayhead() : null
                }
                : null,
            annotations: lesson.getStatus() === 4 ? annotations : [],
            transcript: lesson.toObject().transcript.text,
            uniqueStudents: 0
          };
        }
      )
    )).filter(lesson => lesson != null);

    res.status(200);
    res.json(response);
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
