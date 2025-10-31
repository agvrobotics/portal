import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui'
import auth from './routes/auth';

const app = new OpenAPIHono();

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'AMR Cloud Console',
  },
  // components: {
  //   securitySchemes: {
  //     OAuth2: {
  //       type: "oauth2",
  //       flows: {
  //         password: {
  //           tokenUrl: '/auth/login',
  //           scopes: {}
  //         }
  //       }
  //     }
  //   }
  // }
});
app.get('/', swaggerUI({ url: '/openapi.json'}))

app.route('/auth', auth);

export default app;

