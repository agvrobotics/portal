// functions/api/maps.ts
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("super-secret-key");

export async function onRequestGet({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie") || "";
  const token = cookie.split("token=")[1]?.split(";")[0];

  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const { payload } = await jwtVerify(token, SECRET);
    // Now you're authenticated
    return new Response(JSON.stringify({ maps: ["map1.json", "map2.json"], user: payload.email }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response("Invalid token", { status: 403 });
  }
}
