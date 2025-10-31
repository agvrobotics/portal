import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui'
import auth from './routes/auth';

const app = new OpenAPIHono();

app.doc('/docs', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'AMR Cloud Console',
  },
});
app.get('/', swaggerUI({ url: '/docs' }))

app.route('/auth', auth);

export default app;

