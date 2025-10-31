import { createRoute, z } from "@hono/zod-openapi";
import { JWTSchema, LoginSchema } from './schemas/auth';

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
    201:{
      description : "User logged in succesfully",
      content: {
        "application/json":{
          schema : z.string().openapi({description:"JWT token"})
        }
      }
    },
    400: {
      description: 'Email and password required',
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

export const verify = createRoute({
  method: 'get',
  path: '/verify',
  responses: {
    200: {
      description: 'Verify JWT token and return user info',
      content: {
        "application/json": {
          schema: JWTSchema
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
