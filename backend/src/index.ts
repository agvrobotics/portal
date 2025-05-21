
import { loginHandler } from './routes/login';
import {verifyHandler} from './routes/jwtverify';
import create from './routes/create';
export {Person} from './durable_objects/test_person';


export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    
    try {
      // Handle static routes
      switch (`/${pathSegments[0]}`) {
        case '/random':
          return new Response(crypto.randomUUID());
        case '/login':
          return loginHandler(request, env);
        case '/jwtverify':
          return verifyHandler(request, env);
      }

      // Handle dynamic routes
      if (pathSegments[0] === 'person' && pathSegments[1]) {
        const id = pathSegments[1];
        (request as any).params = { id };
        return create(request, env, ctx);
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
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