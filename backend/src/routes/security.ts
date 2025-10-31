import { jwtVerify } from 'jose'
import type { Context, Next } from 'hono'
import { z } from '@hono/zod-openapi'
import {AccountSchema} from '../openapi/schemas/auth'

const SECRET = new TextEncoder().encode('super-secret-key')

type Account = z.infer<typeof AccountSchema>
export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const cookieHeader = c.req.header('cookie')
    if (!cookieHeader) return c.text('Unauthorized: No cookies', 401)

    const match = cookieHeader.match(/token=([^;]+)/)
    if (!match) return c.text('Unauthorized: No token found', 401)

    const token = match[1]
    const { payload } = await jwtVerify(token, SECRET) as {payload: Account}

    c.set('user', {
      id: payload.id,
      email: payload.email,
    })

    await next()
  } catch (err) {
    console.error('JWT verification failed:', err)
    return c.text('Unauthorized: Invalid token', 401)
  }
}
