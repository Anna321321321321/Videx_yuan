import { ServerError } from 'videx/server/core/error';
import { UserModel } from 'videx/server/entities';
import {
  IUserSchema,
  MongoDB,
  Mongoose,
  TEST_UUID,
  UserType
} from 'videx/server/mongodb';
import user from '../user';

const getRes = async (userId: string) => ({
  locals: {
    videx: {
      user: await UserModel.findById(userId)
    }
  }
});

describe('uAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('failed test', async () => {
    const res = await getRes(TEST_UUID.user.student1);
    const req = {
      query: {}
    };
    const mockNext = jest.fn();
    await user.uAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toEqual(
      new ServerError(403, new Error('Forbidden'))
    );
  });

  it('success test', async () => {
    const res = await getRes(TEST_UUID.user.administrator1);
    const req = {
      query: {}
    };
    const mockNext = jest.fn();
    await user.uAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });
});
