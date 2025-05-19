/**
 * @param {any} cookieHeader
 */
export async function verifyJWT(cookieHeader) {
  const res = await fetch('http://localhost:8787/jwtverify', {
    method: 'GET',
    headers: {
      Cookie: cookieHeader
    }
  });

  if (!res.ok) return null;

  return await res.json(); 
}
