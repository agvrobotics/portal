import {api} from '$env/static/private'

export async function verifyJWT(token : string) {
  const res = await fetch(`${api}auth/verify`, {
    method: 'GET',
    headers: {
      Cookie: `token=${token}`
    }
  });

  if (!res.ok) return null;

  return await res.json(); 
}
