/**
 * @param {any} cookieHeader
 */
export async function verifyJWT(cookieHeader) {
  const res = await fetch('https://backend.michaelmachohi.workers.dev/jwtverify', {
    method: 'GET',
    headers: {
      Cookie: cookieHeader
    }
  });

  if (!res.ok) return null;

  return await res.json(); 
}
