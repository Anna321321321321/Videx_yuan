import { ServerError } from 'videx/server/core/error';
import { HistoryModel, LessonModel, UserModel } from 'videx/server/entities';
import { MongoDB, Mongoose, TEST_UUID } from 'videx/server/mongodb';
import history from '../history';

const getRes = async (userId: string, lessonId: string) => ({
  locals: {
    videx: {
      user: await UserModel.findById(userId),
      lesson: await LessonModel.findById(lessonId)
    }
  }
});

describe('crudAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('field not exist', async () => {
    await HistoryModel.create(
      TEST_UUID.user.student1,
      TEST_UUID.lesson.lesson1
    );
    const res = await getRes(TEST_UUID.user.student1, TEST_UUID.lesson.lesson1);
    const mockNext = jest.fn();
    await history.rudAccess(null, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });
});
