/**
 * @param {any} token
 */
export async function verifyJWT(token) {
  const res = await fetch('https://backend.michaelmachohi.workers.dev/jwtverify', {
    method: 'GET',
    headers: {
      Cookie: `token=${token}`
    }
  });

  if (!res.ok) return null;

  return await res.json(); 
}
