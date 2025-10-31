import { Hono } from 'hono';
import { SignJWT, jwtVerify } from 'jose';
import {Env} from '../types';
import {getDb} from '../db/engine/client';
import {users} from '../db/schema';
import {eq} from 'drizzle-orm'

const auth = new Hono<{ Bindings: Env }>()
const SECRET = new TextEncoder().encode('super-secret-key')

auth.get('/', (c) => c.text('Welcome to Authentication Service'))

auth.post('/login', async (c) => {
  try {
    const body = await c.req.json<{ email?: string; password?: string }>()
    const { email, password } = body

    if (!email || !password) return c.text('Email and password required', 400);
    
    const db = getDb(c.env);
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (!user) return c.text('This email is not associated with an account.', 404);
    if (user.password !== password) return c.text('Invalid credentials', 401);
    

    const token = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(SECRET)

    return c.json({ token }, 200)
  } catch (err) {
    console.error('Login error:', err)
    return c.text('Server error', 500)
  }
})

auth.get('/verify', async (c) => {
  try {
    const cookieHeader = c.req.header('cookie')
    if (!cookieHeader) return c.text('Unauthorized: No cookies', 401)

    const match = cookieHeader.match(/token=([^;]+)/)
    if (!match) return c.text('Unauthorized: No token found', 401)

    const token = match[1]
    const { payload } = await jwtVerify(token, SECRET)

    return c.json({
      message: 'Token valid',
      user: {
        email: payload.email,
        id: payload.id,
      },
    })
  } catch (err) {
    console.error('JWT verification failed:', err)
    return c.text('Unauthorized: Invalid token', 401)
  }
})

export default auth
