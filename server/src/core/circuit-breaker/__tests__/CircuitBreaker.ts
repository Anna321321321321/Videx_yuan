import CircuitBreaker from '../CircuitBreaker';

describe('circuitBreaker unit tests', () => {
  it('check init status', async () => {
    expect(CircuitBreaker.getStatus()).toBe(false);
  });

  it('check status after close', async () => {
    CircuitBreaker.close('mongodb');
    expect(CircuitBreaker.getStatus()).toBe(false);
    CircuitBreaker.close('redis');
    expect(CircuitBreaker.getStatus()).toBe(true);
  });

  it('check status after closed', async () => {
    expect(CircuitBreaker.getStatus()).toBe(true);
    CircuitBreaker.open('mongodb');
    expect(CircuitBreaker.getStatus()).toBe(false);
    CircuitBreaker.close('mongodb');
    expect(CircuitBreaker.getStatus()).toBe(true);
    CircuitBreaker.open('redis');
    expect(CircuitBreaker.getStatus()).toBe(false);
  });
});
