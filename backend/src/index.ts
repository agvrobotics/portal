
import { loginHandler } from './routes/login';
import {verifyHandler} from './routes/jwtverify';
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/random':
				return new Response(crypto.randomUUID());
			case '/login':
				return loginHandler(request, env);
			case '/jwtverify':
				return verifyHandler(request, env);	
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
