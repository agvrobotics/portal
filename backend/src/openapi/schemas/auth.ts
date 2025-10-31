import { z } from '@hono/zod-openapi';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password : z.string(),
}).openapi("User");

export const LoginSchema = UserSchema.omit({id: true})
export const JWTSchema = UserSchema.omit({password: true})
