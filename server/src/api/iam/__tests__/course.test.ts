import { ServerError } from 'videx/server/core/error';
import { UserModel } from 'videx/server/entities';
import { MongoDB, TEST_UUID } from 'videx/server/mongodb';
import course from '../course';

const getRes = async (userId: string) => ({
  locals: {
    videx: {
      user: await UserModel.findById(userId)
    }
  }
});

const getReq = () => ({
  params: {
    courseId: TEST_UUID.course.course1
  }
});

describe('cAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('teacher', async () => {
    const res = await getRes(TEST_UUID.user.teacher1);
    const mockNext = jest.fn();
    await course.cAccess(null, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('administrator', async () => {
    const res = await getRes(TEST_UUID.user.administrator1);
    const mockNext = jest.fn();
    await course.cAccess(null, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('student', async () => {
    const res = await getRes(TEST_UUID.user.student1);
    const mockNext = jest.fn();
    await course.cAccess(null, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toEqual(
      new ServerError(401, new Error('Unauthorized Access'))
    );
  });
});

describe('rAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('subscribers', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.student1);
    const mockNext = jest.fn();
    await course.rAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('administrator', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.administrator1);
    const mockNext = jest.fn();
    await course.rAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('non-subscriber', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.teacher2);
    const mockNext = jest.fn();
    await course.rAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toEqual(
      new ServerError(401, new Error('Unauthorized Access'))
    );
  });
});

describe('uAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('owner', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.teacher1);
    const mockNext = jest.fn();
    await course.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('global-administrator', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.administrator1);
    const mockNext = jest.fn();
    await course.rAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('others', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.student1);
    const mockNext = jest.fn();
    await course.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toEqual(
      new ServerError(401, new Error('Unauthorized Access'))
    );
  });
});

describe('udAccess unit tests', () => {
  beforeAll(async () => {
    await MongoDB.init();
    await MongoDB.populateDB();
  });

  it('owner', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.teacher1);
    const mockNext = jest.fn();
    await course.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('global-administrator', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.administrator1);
    const mockNext = jest.fn();
    await course.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('others', async () => {
    const req = getReq();
    const res = await getRes(TEST_UUID.user.student1);
    const mockNext = jest.fn();
    await course.udAccess(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toEqual(
      new ServerError(401, new Error('Unauthorized Access'))
    );
  });
});
