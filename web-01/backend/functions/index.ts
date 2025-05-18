export async function onRequestGet() {
  return new Response(
    JSON.stringify({ message: "Welcome to agvrobotics!" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
