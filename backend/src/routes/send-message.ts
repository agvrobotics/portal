interface Env {
  AGV_WS: DurableObjectNamespace;
}
export async function sendMessage(request: Request, env: Env) {
  const { message } = (await request.json()) as { message: string };
  const agvId = "test-agv";
  const doId = env.AGV_WS.idFromName(agvId);
  const stub = env.AGV_WS.get(doId);
  return stub.fetch("http://do/internal", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}