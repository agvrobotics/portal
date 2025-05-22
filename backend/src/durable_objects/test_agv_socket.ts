export class AgvSocket {
  state: DurableObjectState;
  clients: Set<WebSocket>;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.clients = new Set(); // Keep track of connected frontend sockets
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 400 });
    }

    const [clientSocket, serverSocket] = Object.values(new WebSocketPair());
    this.handleWebSocket(serverSocket);
    return new Response(null, {
      status: 101,
      webSocket: clientSocket,
    });
  }

  handleWebSocket(ws: WebSocket) {
    ws.accept();

    this.clients.add(ws);

    ws.addEventListener("message", (event) => {
      const message = event.data;
      console.log("[AGV SOCKET] Received message from frontend:", message);

      // This is where you'd later forward it to ROS

      // Echo back for test
      ws.send(`[ACK] Message received: ${message}`);
    });

    ws.addEventListener("close", () => {
      this.clients.delete(ws);
      console.log("[AGV SOCKET] Connection closed.");
    });

    ws.addEventListener("error", (err) => {
      console.log("[AGV SOCKET] Error:", err);
    });
  }
}
