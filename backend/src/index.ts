import { Hono } from 'hono'
import auth from './routes/auth'

const app = new Hono()

app.route('/auth', auth)
app.get('/hello', (c) => c.text('Hello from Hono!'))

export default app

