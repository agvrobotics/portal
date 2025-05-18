export async function onRequestGet() {
  return new Response(
    JSON.stringify({ message: "Welcome to agvrobotics mapping!" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
