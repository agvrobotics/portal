import { verifyJWT } from '$lib/server/verifyjwt.js';
import { redirect } from '@sveltejs/kit';

export async function load({ request, cookies }) {
  const cookieHeader = request.headers.get('cookie');
  const user = await verifyJWT(cookieHeader);

  if (!user) {
    throw redirect(302, '/login');
  }
  return {
    user // Available in all pages via `data.user`
  };
}


/**
 * <script>
  export let data;
</script>

<h1>Welcome {data.user.email}</h1>
<slot />

 */