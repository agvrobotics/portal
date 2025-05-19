import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode("super-secret-key");

export async function verifyHandler(request: Request, env: any) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return new Response('Unauthorized: No cookies', { status: 401 });
  }

  // Parse token from cookies (assuming cookie name is 'token')
  const match = cookieHeader.match(/token=([^;]+)/);
  if (!match) {
    return new Response('Unauthorized: No token found', { status: 401 });
  }
  const token = match[1];

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, SECRET);

    // Token is valid - return user info or success message
    return new Response(JSON.stringify({
      message: 'Token valid',
      user: {
        email: payload.email,
        id: payload.id,
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response('Unauthorized: Invalid token', { status: 401 });
  }
}
