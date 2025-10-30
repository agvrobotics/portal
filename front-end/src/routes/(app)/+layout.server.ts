import { verifyJWT } from '$lib/server/verifyjwt.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {  
  const token = cookies.get('token');
  if(!token) {
    throw redirect(302, '/login');
  }
  const user = await verifyJWT(token);
  if (!user) {
    throw redirect(302, '/login');
  }
  return {
    user
  };
}