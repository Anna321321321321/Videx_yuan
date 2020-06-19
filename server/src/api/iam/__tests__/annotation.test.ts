import { ServerError } from 'videx/server/core/error';
import { LessonModel, UserModel } from 'videx/server/entities';
import {
  IUserSchema,
  MongoDB,
  Mongoose,
  TEST_UUID,
  UserType
} from 'videx/server/mongodb';
import annotation from '../annotation';

describe('rAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });
});

describe('udAccess unit tests', () => {
  const getRes = async (userId: string, lessonId: string) => ({
    locals: {
      videx: {
        user: await UserModel.findById(userId),
        lesson: await LessonModel.findById(lessonId)
      }
    }
  });

  const getReq = async (annotationId: string) => ({
    params: {
      annotationId: annotationId
    }
  });

  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('fail: user are not annotation owner', async () => {
    const res = await getRes(TEST_UUID.user.student1, TEST_UUID.lesson.lesson1);
    const req = await getReq(TEST_UUID.annotation.annotation2);
    const mockNext = jest.fn();
    await annotation.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toEqual(
      new ServerError(400, new Error('Bad Request'))
    );
  });

  it('success', async () => {
    const res = await getRes(TEST_UUID.user.student1, TEST_UUID.lesson.lesson1);
    const req = await getReq(TEST_UUID.annotation.annotation1);
    const mockNext = jest.fn();
    await annotation.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });
});

describe('cAccess unit tests', () => {
  const getRes = async (userId: string, lessonId: string) => ({
    locals: {
      videx: {
        user: await UserModel.findById(userId),
        lesson: await LessonModel.findById(lessonId)
      }
    }
  });

  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('success', async () => {
    const res = await getRes(TEST_UUID.user.student1, TEST_UUID.lesson.lesson1);
    const mockNext = jest.fn();
    await annotation.cAccess(null, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });
});
