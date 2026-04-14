import { describe, it, expect } from 'vitest';
import { validateDecision, validateUser, validateMockToken } from '../utils/security';

describe('Security Validation & Unit Bounds', () => {
  it('should validate a correct user object', () => {
    const user = { uid: '123', email: 'test@example.com', role: 'admin' };
    const result = validateUser(user);
    expect(result.success).toBe(true);
  });

  it('should fail user validation on missing uid', () => {
    const user = { email: 'test@example.com', role: 'admin' };
    const result = validateUser(user);
    expect(result.success).toBe(false);
  });

  it('should fail user validation on bad email', () => {
    const user = { uid: '123', email: 'not-an-email', role: 'admin' };
    const result = validateUser(user);
    expect(result.success).toBe(false);
  });

  it('should validate correct Decision object with confidence', () => {
    const decision = { id: 'd1', message: 'Test', type: 'redirect', confidence: 90, riskLevel: 'low', reasoning: 'clear path' };
    const result = validateDecision(decision);
    expect(result.success).toBe(true);
  });

  it('should fail decision validation on incorrect type', () => {
    const decision = { id: 'd1', message: 'Test', type: 'invalid_type', confidence: 90, riskLevel: 'low' };
    const result = validateDecision(decision);
    expect(result.success).toBe(false);
  });
  
  it('should fail decision validation on out of bounds confidence', () => {
    const decision = { id: 'd1', message: 'Test', type: 'redirect', confidence: 150, riskLevel: 'low' };
    const result = validateDecision(decision);
    expect(result.success).toBe(false);
  });
  
  it('should validate admin token accurately', () => {
    const result = validateMockToken("mock-jwt-token-admin-1234");
    expect(result.valid).toBe(true);
    expect(result.role).toBe('admin');
  });
  
  it('should invalidate incorrect token', () => {
    const result = validateMockToken("fake-token");
    expect(result.valid).toBe(false);
    expect(result.role).toBe('guest');
  });
});
