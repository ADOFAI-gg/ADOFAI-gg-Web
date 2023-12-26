import { passwordRule, usernameRule } from '@/utils/validation';
import { z } from 'zod';

export const schema = z
  .object({
    email: z.string().email({ message: 'invalid-email' }),
    username: usernameRule,
    password: passwordRule,
    confirmPassword: passwordRule
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'password-didnt-match',
        path: ['confirmPassword']
      });
    }
  });
