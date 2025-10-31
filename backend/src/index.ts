import { OpenAPIHono } from '@hono/zod-openapi';
import auth from './routes/auth';

const app = new OpenAPIHono();

app.doc('/docs', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'AMR Cloud Console Backend API',
  },
});

app.get('/', (c) => c.text('AMR Cloud Console Backend'));
app.route('/auth', auth);

export default app;

