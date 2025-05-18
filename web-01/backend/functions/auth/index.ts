export async function onRequestGet() {
  return new Response(
    JSON.stringify({ message: "Welcome to agvrobotics auth!" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
