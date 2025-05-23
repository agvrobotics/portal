import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode("super-secret-key");

export async function loginHandler(request: Request, env: any) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    interface LoginBody {
      email?: string;
      password?: string;
    }
    const body: LoginBody = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response("Email and password required", { status: 400 });
    }

    const stmt = env.DB.prepare("SELECT * FROM users WHERE email = ?");
    const user = await stmt.bind(email).first();

    if (!user) {
      return new Response("This email is not associated with an account.", { status: 404 });
    }

    if (user.password !== password) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const token = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(SECRET);

    if (!token) {
      return new Response("Token generation failed", { status: 500 });
    }
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    });


  } catch (err) {
    console.error("Login error:", err);
    return new Response("Server error", { status: 500 });
  }
}
