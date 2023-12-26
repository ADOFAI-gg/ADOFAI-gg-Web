import { z } from 'zod';

export const usernameRule = z.string().min(6, { message: 'min-characters|min=6' });

/**
 * Password rules
 * - Min length is 8 characters
 */
export const passwordRule = z.string().min(8, { message: 'min-characters|min=8' });
