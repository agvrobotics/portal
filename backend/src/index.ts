
import { loginHandler } from './routes/login';
import {verifyHandler} from './routes/jwtverify';
import create from './routes/create';
export {Person} from './durable_objects/AGVWebSocket';

import { Router } from 'itty-router';
const router = Router();

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
			case '/person/:id':
				return create(request, env, ctx);
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;

 export interface Env {
     // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
     // MY_KV_NAMESPACE: KVNamespace;
     //
     // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
     PERSON: DurableObjectNamespace;
     //
     // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
     // MY_BUCKET: R2Bucket;
 }