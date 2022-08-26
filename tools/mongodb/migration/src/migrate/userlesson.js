import mongoose from 'mongoose';
import uuid from 'uuid';
import crypto from 'crypto';

const userlessonModel = mongoose.model('UserLesson');
const userModel = mongoose.model('User');
const lessonModel = mongoose.model('Lesson');
const historyV3Model = mongoose.model('HistoryV3');
const annotationV3Model = mongoose.model('AnnotationV3');

const getId = (userId, lessonId) => {
  return crypto
    .createHash('sha256')
    .update(userId + lessonId)
    .digest('hex');
};

const convertColor = color => {
  switch (color) {
    case 'yellow':
      return '#fff110';
    case 'green':
      return '#4cba35';
    case 'blue':
      return '#28a3dc';
    case 'purple':
      return '#9719ff';
    default:
      return null;
  }
};

const createAnnotation = async (userId, lessonId, text, color, start, end) => {
  await annotationV3Model.create({
    _id: uuid.v4(),
    userId: userId,
    lessonId: lessonId,
    text: text,
    color: convertColor(color),
    start: start,
    end: end,
    share: false,
    editedAt: new Date(),
    publicForShare: true
  });
};

export default async () => {
  await historyV3Model.remove({});
  await annotationV3Model.remove({});

  const studentIds = (await userModel.find({}))
    .filter(
      user => user.type !== 2 && user.type !== 1 && user.courses.length !== 0
    )
    .map(user => user._id);
  const lessonIds = (await lessonModel.find({}))
    .filter(lesson => lesson.status === 4)
    .map(lesson => lesson._id);

  for (const studentId of studentIds) {
    for (const lessonId of lessonIds) {
      const id = getId(studentId, lessonId);
      const document = await userlessonModel.findById(id);
      if (document && document.views.length !== 0) {
        await historyV3Model.create({
          _id: id,
          userId: studentId,
          lessonId: lessonId,
          counter: 0,
          date: null,
          playhead: null,
          views: document.views
        });
        await Promise.all(
          document.highlights.map(async highlight => {
            await createAnnotation(
              studentId,
              lessonId,
              null,
              highlight.color,
              highlight.range.start,
              highlight.range.end
            );
          })
        );
        await Promise.all(
          document.notes.map(async note => {
            await createAnnotation(
              studentId,
              lessonId,
              '#redacted',
              null,
              note.time,
              note.time
            );
          })
        );
        await Promise.all(
          document.tags.map(async tag => {
            await createAnnotation(
              studentId,
              lessonId,
              tag.text,
              tag.color,
              tag.range.start,
              tag.range.end
            );
          })
        );
      }
    }
  }
  console.log('Finish Processing UserLesson Collection');
};
