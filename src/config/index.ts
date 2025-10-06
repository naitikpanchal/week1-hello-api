import { z } from 'zod';

const encSchema = z.object({
  PORT: z.string().transform((val = '3000') => parseInt(val, 10)),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsedEnv = encSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', z.treeifyError(parsedEnv.error));
  throw new Error('Invalid environment variables');
}

export const config = parsedEnv.data;
console.log(`✅ Running in ${config.NODE_ENV} mode on port ${config.PORT}`);
