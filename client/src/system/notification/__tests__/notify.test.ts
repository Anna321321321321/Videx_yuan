import notify from '../notify';

const notifications = [
  {
    version: '0.0.0',
    message: 'Message1',
    description: 'Description1',
    duration: null
  },
  {
    version: '1.0.0',
    message: 'Message2',
    description: 'Description2',
    duration: null
  },
  {
    version: '2.0.0',
    message: 'Message3',
    description: 'Description3',
    duration: null
  }
];

describe('notify Unit Tests', () => {
  it('simple test 1', () => {
    const mock = jest.fn();
    notify('0.0.0', notifications, mock);
    expect(mock.mock.calls.length).toBe(2);
    expect(mock.mock.calls[0]).toEqual(['Message2', 'Description2', null]);
    expect(mock.mock.calls[1]).toEqual(['Message3', 'Description3', null]);
  });

  it('simple test 2', () => {
    const mock = jest.fn();
    notify('1.0.0', notifications, mock);
    expect(mock.mock.calls.length).toBe(1);
    expect(mock.mock.calls[0]).toEqual(['Message3', 'Description3', null]);
  });

  it('simple test 3', () => {
    const mock = jest.fn();
    notify('2.0.0', notifications, mock);
    expect(mock.mock.calls.length).toBe(0);
  });
});
