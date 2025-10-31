import { OpenAPIHono, z } from '@hono/zod-openapi';
import { SignJWT } from 'jose';
import {eq} from 'drizzle-orm'
//#######################################
import {getDb} from '../db/engine/client';
import {users} from '../db/schema';
import {Env, Variables} from '../types';
import {authMiddleware} from './security';
import {account, login} from '../openapi/auth';
import {LoginSchema, AccountSchema} from '../openapi/schemas/auth'

const auth = new OpenAPIHono<{ Bindings: Env ; Variables: Variables }>()
const SECRET = new TextEncoder().encode('super-secret-key')

type LoginBody = z.infer<typeof LoginSchema>
auth.openapi(login, async (c) => {
  try {
    const body = await c.req.json<LoginBody>()
    const { email, password } = body

    if (!email || !password) return c.text('Email and password required', 400);
    
    const db = getDb(c.env);
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (!user) return c.text('This email is not associated with an account', 404);
    if (user.password !== password) return c.text('Invalid credentials', 401);

    const token = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(SECRET)

    c.header(
      'Set-Cookie', 
      `token=${token}; 
      HttpOnly; 
      Secure; 
      SameSite=Strict; 
      Path=/; 
      Max-Age=3600`
    )
    return c.json('Login Successful', 200)
  } catch (err) {
    console.error('Login error:', err)
    return c.text('Internal server error', 500)
  }
})


auth.use('*', authMiddleware);

type Account = z.infer<typeof AccountSchema>
auth.openapi(account, async (c) => {
  try {
    const user = c.get('user') as Account
    return c.json({
      id: user.id,
      email: user.email,
    }, 200)
  } catch (err) {
    console.error('JWT verification failed:', err)
    return c.text('Unauthorized: Invalid token', 401)
  }
})

export default auth
