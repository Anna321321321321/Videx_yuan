import Redis from '../../Redis';
import cache from '../cache';

const value = {
  test: 'test'
};

const req = {
  originalUrl: '/api/v2/courses'
};

const res = {
  status: jest.fn(),
  json: jest.fn()
};

describe('cache unit tests', () => {
  beforeAll(async () => {
    await Redis.flushall();
  });

  it('not cached', async () => {
    const mockNext = jest.fn();
    await cache(req, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(undefined);
  });

  it('cached', async done => {
    await Redis.setex('/api/v2/courses', 3, value);
    await cache(req, res, null);
    expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0]).toEqual(value);
    setTimeout(async () => {
      const tmp = await Redis.get('/api/v2/courses', true);
      expect(tmp).toEqual(null);
      done();
    }, 4000);
  });
});
