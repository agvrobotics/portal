// functions/auth/login.ts
import { jwtVerify, SignJWT } from 'jose';

const SECRET = new TextEncoder().encode("super-secret-key");

export async function onRequestPost({ request }: { request: Request }) {
  const body = await request.json();
  const { email, password } = body;

  // ⚠️ TEMP USER (replace with real DB later)
  const validUser = email === "user@example.com" && password === "pass123";

  if (!validUser) {
    return new Response("Invalid credentials", { status: 401 });
  }

  // Create JWT
  const jwt = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(SECRET);

  // Return cookie with JWT
  return new Response("Logged in", {
    status: 200,
    headers: {
      "Set-Cookie": `token=${jwt}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}
