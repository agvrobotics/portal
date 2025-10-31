import { drizzle } from 'drizzle-orm/d1';
import { users } from '../schema';
import type { Env } from '../../types';

export const getDb = (env: Env) => drizzle(env.DB, { schema: { users } });
