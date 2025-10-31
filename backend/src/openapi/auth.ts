import { createRoute, z } from "@hono/zod-openapi";
import { AccountSchema, LoginSchema } from './schemas/auth';

export const login = createRoute({
  method: 'post',
  path: '/login',
  request: {
    body:{
      required: true,
      content: {
        'application/json': {
          schema: LoginSchema
        },
      },
    }
  },
  responses: {
    200:{
      description : "Login Successfull",
      content: {
        "application/json":{
          schema : z.string()
        }
      }
    },
    400: {
      description: 'Bad request: Email and password required',
      content: {
        'text/plain': {
          schema: z.string()
        }
      }
    },
    401: {
      description: 'Invalid credentials',
      content: {
        'text/plain': {
          schema: z.string()
        }
      }
    },
    404: {
      description: 'This email is not associated with an account.',
      content: {
        'text/plain': {
          schema: z.string()
        }
      }
    },
    500: {
      description: 'Internal server error',
      content: {
        'text/plain': {
          schema: z.string()
        }
      }
    }
  }
})

export const account = createRoute({
  method: 'get',
  path: '/account',
  responses: {
    200: {
      description: 'Account information',
      content: {
        "application/json": {
          schema: AccountSchema
        }
      },
    },
    401: {
      description: 'Unauthorized: Invalid token',
      content: {
        'text/plain': {
          schema: z.string()
        }
      }
    }
  },
})
