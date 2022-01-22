import jwt from 'jsonwebtoken';

export function signToken(payload: string | Record<string, string>, key: string): string {
  return jwt.sign(payload, key);
}

export function decodeToken(token: string, key: string): { success: boolean } {
  try {
    jwt.verify(token, key);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
