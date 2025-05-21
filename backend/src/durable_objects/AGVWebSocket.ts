export class AGVWebSocket implements DurableObject {
  private socket: WebSocket | null = null;

  async fetch(request: Request) {
    // Upgrade to WebSocket
    if (request.headers.get('Upgrade') === 'websocket') {
      const [client, server] = Object.values(new WebSocketPair());
      this.socket = server;
      this.socket.accept();
      return new Response(null, { status: 101, webSocket: client });
    }
    return new Response("Expected WebSocket", { status: 400 });
  }
}