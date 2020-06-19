import Redis from '../Redis';

const value = { test: 'test' };

describe('Redis simple unit tests', () => {
  beforeAll(async () => {
    await Redis.flushall();
  });

  it('nullable', async () => {
    const result = await Redis.get('sample', true);
    expect(result).toEqual(null);
  });

  it('not nullable', async () => {
    await Redis.set('sample', value);
    const result = await Redis.get('sample');
    expect(result).toEqual(value);
  });
});

describe('Redis setex unit tests', () => {
  beforeAll(async () => {
    await Redis.flushall();
  });

  it('simple test', async done => {
    await Redis.setex('sample', 3, value);
    const result = await Redis.get('sample');
    expect(result).toEqual(value);
    setTimeout(async () => {
      const tmp = await Redis.get('sample', true);
      expect(tmp).toEqual(null);
      done();
    }, 4000);
  });
});
