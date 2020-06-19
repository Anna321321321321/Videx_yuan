import { LessonModel } from 'videx/server/entities';
import { MongoDB, TEST_UUID } from 'videx/server/mongodb';
import get from '../get';

const getRes = async lessonId => {
  return {
    locals: {
      videx: {
        lesson: await LessonModel.findById(lessonId)
      }
    },
    status: jest.fn(),
    json: jest.fn()
  };
};

describe('get unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('simple test', async () => {
    const res = await getRes(TEST_UUID.lesson.lesson1);
    await get(null, res, null);
    expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0]).toEqual([
      {
        start: 1,
        end: 3,
        counter: 1
      },
      {
        start: 4,
        end: 4,
        counter: 3
      },
      {
        start: 5,
        end: 6,
        counter: 2
      }
    ]);
  });
});
