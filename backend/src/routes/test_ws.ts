const wsTestHandler = async (
  request: Request & { params: { id: string } },
  env: { AGV_SOCKET: DurableObjectNamespace },
  ctx: ExecutionContext
): Promise<Response> => {
  try {
    const id = env.AGV_SOCKET.idFromName(request.params.id);
    const stub = env.AGV_SOCKET.get(id);

    return await stub.fetch(request); // Forward WebSocket upgrade to the DO
  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export default wsTestHandler;
