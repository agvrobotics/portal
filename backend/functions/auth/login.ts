// functions/auth/login.ts
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode("super-secret-key");

export async function onRequestPost(context: { request: any; env: any; }) {
  const { request, env } = context;
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response("Email and password required", { status: 400 });
  }

  try {
    // Look up the user by email
    const stmt = env.DB.prepare("SELECT * FROM users WHERE email = ?");
    const user = await stmt.bind(email).first();

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Compare password (plaintext for now — needs hashing later)
    if (user.password !== password) {
      return new Response("Invalid credentials", { status: 401 });
    }

    // Create JWT with user's email and id
    const token = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(SECRET);

    // Return JWT in cookie
    return new Response("Login successful", {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return new Response("Server error", { status: 500 });
  }
}
