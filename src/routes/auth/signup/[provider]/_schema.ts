import { usernameRule } from '@/utils/validation';
import { z } from 'zod';

export const schema = z.object({
  username: usernameRule
});
