import { z } from 'zod';

export const UserSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum(['admin', 'user']),
});

export const DecisionSchema = z.object({
  id: z.string(),
  message: z.string(),
  type: z.enum(['redirect', 'prediction', 'optimization']),
  confidence: z.number().min(0).max(100).optional(),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
  reasoning: z.string().optional(),
});

export const validateDecision = (data: unknown) => {
  return DecisionSchema.safeParse(data);
};

export const validateUser = (data: unknown) => {
  return UserSchema.safeParse(data);
};

// Mock Auth Context / Token Validation
export const validateMockToken = (token: string) => {
  if (token === "mock-jwt-token-admin-1234") {
    return { valid: true, role: 'admin' };
  }
  return { valid: false, role: 'guest' };
};
