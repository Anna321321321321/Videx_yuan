import * as express from 'express';
import * as iam from '../iam';
import * as share from '../share';
import * as controller from './controller';

const router = express.Router();
/**
 * Consent Controllers
 */
// prettier-ignore
router.route('/consent/').get(controller.consent.get);
router.route('/consent/register').post(controller.consent.post);
router.route('/consent/email/').get(controller.consent.getByEmail);
router
  .route('/consent/:consentId')
  .put(iam.Consent.udAccess, controller.consent.put);

/**
 * Courses Controllers
 */
// prettier-ignore
router.route('/courses/register').put(controller.courses.register.put);
// prettier-ignore
router.route('/courses/:courseId').get(iam.Course.udAccess, controller.courses.get);
// prettier-ignore
router.route('/courses/:courseId').put(iam.Course.udAccess, controller.courses.put);
// prettier-ignore
router.route('/courses/:courseId').delete(iam.Course.udAccess, controller.courses.del);
// prettier-ignore
router.route('/courses').get(controller.courses.gets);
// prettier-ignore
router.route('/courses').post(iam.Course.cAccess, controller.courses.post);

/**
 * Dashboard Controllers
 */
// prettier-ignore
router.route('/dashboard/courses/:courseId').get(iam.Course.rAccess, controller.dashboard.get);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getActiveSubscribers').get(iam.Course.rAccess, controller.dashboard.analytics.getActiveSubscribers);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getSessionsPerLesson').get(iam.Course.rAccess, controller.dashboard.analytics.getSessionsPerLesson);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getAverageViewTime').get(iam.Course.rAccess, controller.dashboard.analytics.getAverageViewTime);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getLessonVisitNameOverTime').get(iam.Course.rAccess, controller.dashboard.analytics.getLessonVisitNameOverTime);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getTotalViewCountOverTime').get(iam.Course.rAccess, controller.dashboard.analytics.getTotalViewCountOverTime);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getUniqueSessionsPerLesson').get(iam.Course.rAccess, controller.dashboard.analytics.getUniqueSessionsPerLesson);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getCourseAnnotations').get(iam.Course.rAccess, controller.dashboard.analytics.getCourseAnnotations);
// prettier-ignore
router.route('/dashboard/courses/:courseId/analytics/getCoursePauses').get(iam.Course.rAccess, controller.dashboard.analytics.getCoursePauses);
// prettier-ignore
router.route('/dashboard/courses/:courseId/lesson/:lessonId/analytics/getLessonPauses').get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.dashboard.analytics.getLessonPauses);
// prettier-ignore
router.route('/dashboard/courses/:courseId/lesson/:lessonId/analytics/getLessonHidden').get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.dashboard.analytics.getLessonHidden);
// prettier-ignore
router.route('/dashboard/courses/:courseId/lesson/:lessonId/analytics/getLessonAnnotation').get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.dashboard.analytics.getLessonAnnotation);
// prettier-ignore
router.route('/dashboard/courses/:courseId/lesson/:lessonId/analytics/getLessonSeeks').get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.dashboard.analytics.getLessonSeeks);

/**
 * Users Controllers
 */
router.route('/users').get(controller.users.get);
router.route('/users/:userId').put(iam.User.uAccess, controller.users.put);
router.route('/users/:userId').delete(iam.User.uAccess, controller.users.del);

/**
 * Lesson Controllers
 */
// prettier-ignore
router.route('/courses/:courseId/lessons').get(iam.Course.rAccess, controller.lessons.gets);
// prettier-ignore
router.route('/courses/:courseId/lessons').post(controller.lessons.middleware.upload, iam.Course.udAccess, controller.lessons.post);
// prettier-ignore
router.route('/courses/:courseId/lessons/:lessonId').delete(iam.Course.udAccess, iam.Lesson.rudAccess, controller.lessons.del);
// prettier-ignore
router.route('/courses/:courseId/lessons/:lessonId').put(iam.Course.udAccess, iam.Lesson.rudAccess, controller.lessons.put);
// prettier-ignore
router.route('/courses/:courseId/lessons/:lessonId').get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.lessons.get);
// prettier-ignore
router.route('/courses/:courseId/lessons/:lessonId/views').get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.lessons.views.get);

/**
 * Download Controllers
 */
router
  .route('/courses/:courseId/lessons/:lessonId/downloads/pdf')
  .get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.downloads.pdf);
router
  .route('/courses/:courseId/lessons/:lessonId/downloads/onenote')
  .get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.downloads.onenote);

/**
 * Playlist Controllers
 */
router
  .route('/playlist/:courseId')
  .post(iam.Course.rAccess, controller.playlist.post);
router
  .route('/playlist/:courseId')
  .get(iam.Course.rAccess, controller.playlist.get);
router
  .route('/playlist/:courseId')
  .put(iam.Course.rAccess, iam.Playlist.udAccess, controller.playlist.put);

/**
 * Experiment Controllers
 */
router
  .route('/experiments')
  .get(iam.Experiment.cudAccess, controller.experiments.get);
router
  .route('/experiments/:experimentId')
  .delete(iam.Experiment.cudAccess, controller.experiments.del);
router
  .route('/experiments')
  .post(iam.Experiment.cudAccess, controller.experiments.post);

/**
 * Reaction Controllers
 */
router
  .route(
    '/courses/:courseId/lessons/:lessonId/annotations/:annotationId/reactions/create'
  )
  .post(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.Reaction.cdAccess,
    controller.reactions.post
  );
router
  .route(
    '/courses/:courseId/lessons/:lessonId/annotations/:annotationId/reactions/remove'
  )
  .delete(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.Reaction.cdAccess,
    controller.reactions.del
  );

/**
 * Annotation Controller
 */
router
  .route('/courses/:courseId/lessons/:lessonId/annotations')
  .get(iam.Course.rAccess, iam.Lesson.rudAccess, controller.annotations.get);
router
  .route('/courses/:courseId/lessons/:lessonId/annotations')
  .post(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.Annotation.cAccess,
    controller.annotations.post
  );
router
  .route('/courses/:courseId/lessons/:lessonId/annotations/:annotationId')
  .put(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.Annotation.udAccess,
    controller.annotations.put
  );
router
  .route('/courses/:courseId/lessons/:lessonId/annotations/:annotationId')
  .delete(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.Annotation.udAccess,
    controller.annotations.del
  );

/**
 * History Controller
 */
router
  .route('/courses/:courseId/lessons/:lessonId/histories')
  .get(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.History.rudAccess,
    controller.histories.get
  );

router
  .route('/courses/:courseId/lessons/:lessonId/histories/views')
  .get(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.History.rudAccess,
    controller.histories.views.get
  );
router
  .route('/courses/:courseId/lessons/:lessonId/histories/views')
  .post(
    iam.Course.rAccess,
    iam.Lesson.rudAccess,
    iam.History.rudAccess,
    controller.lessons.views.post,
    controller.histories.views.post
  );

/**
 * Link Controller
 */
router.route('/links/:token').get(controller.links.get);
router
  .route('/courses/:courseId/lessons/:lessonId/links')
  .post(iam.Course.rAccess, iam.Lesson.rudAccess, controller.links.post);

/**
 * Flight Controllers
 */
router.route('/flights').get(controller.flights.get);
/**
 * Share Controllers
 */
router
  .route('/courses/:courseId/lessons/:lessonId/share')
  .get(controller.share.get);
router
  .route('/courses/lessons/share/:link/accessor')
  .get(controller.share.getLink.getAccessor);
router
  .route('/courses/lessons/share/:link/accessor')
  .post(controller.share.getLink.postAccessor);
// router
//   .route('/courses/lessons/share/:link')
//   .get(controller.share.getLink.getLink);
router
  .route('/courses/lessons/share/:link')
  .get(controller.share.getLink.getLink);

share.noRoutes(router);

export default router;
