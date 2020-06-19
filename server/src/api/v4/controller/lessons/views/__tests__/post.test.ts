import { LessonModel } from 'videx/server/entities';
import {
  ILessonSchema,
  MongoDB,
  Mongoose,
  TEST_UUID
} from 'videx/server/mongodb';
import post from '../post';

const getRes = async lessonId => {
  return {
    locals: {
      videx: {
        lesson: await LessonModel.findById(lessonId)
      }
    }
  };
};

describe('post unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
    await Mongoose.create('Lesson', {
      _id: TEST_UUID.lesson.lesson1,
      views: []
    });
  });

  it('success 1', async done => {
    const req = {
      body: {
        views: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22
        ]
      }
    };
    const res = await getRes(TEST_UUID.lesson.lesson1);
    // pseudo concurrent test
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    post(req, res, jest.fn());
    setTimeout(async () => {
      const document: ILessonSchema = <ILessonSchema>(
        await Mongoose.findById('Lesson', TEST_UUID.lesson.lesson1)
      );
      // @ts-ignore
      expect(document.views.toObject().sort((a, b) => a._id - b._id)).toEqual(
        req.body.views.map(timestamp => ({
          _id: timestamp,
          counter: 20
        }))
      );
      done();
    }, 4000);
  });
});
