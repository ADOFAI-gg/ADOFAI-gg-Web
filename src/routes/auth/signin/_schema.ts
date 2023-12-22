import z from 'zod';

export const schema = z.object({
  username: z.string().min(1, { message: 'required' }),
  password: z.string().min(1, { message: 'required' }),
  remember: z.boolean()
});
