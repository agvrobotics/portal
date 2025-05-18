interface RequestBody {
  name?: string;
}

export async function testHandler(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body: RequestBody = await request.json();
    const name = body.name;

    if (!name) {
      return new Response("No name passed", { status: 400 });
    }

    return new Response(`Hello ${name}`);
  } catch (err) {
    return new Response("Invalid JSON", { status: 400 });
  }
}
