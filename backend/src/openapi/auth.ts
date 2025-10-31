import { createRoute } from "@hono/zod-openapi";
import { verifyTokenSchema } from './schemas/auth';

export const verify = createRoute({
  method: 'get',
  path: '/verify',
  responses: {
    200: {
      content: {
        "application/json": {
          schema: verifyTokenSchema
        }
      },
      description: 'Verify JWT token and return user info'
    }
  },
})

export type VerifyRoute = typeof verify;
