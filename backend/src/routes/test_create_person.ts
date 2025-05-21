const create = async (request: any, env: { PERSON: { idFromName: (arg0: string) => any; get: (arg0: any) => any; }; }, context: any) => {
    try {
        // Generate ID and get Durable Object stub
        let id = env.PERSON.idFromName(request.params.id);
        let obj = env.PERSON.get(id);

        // Forward request to Durable Object
        let resp = await obj.fetch(request);
        let jsonStr = await resp.json();

        // Construct response JSON
        const json = {
            status: "success",
            data: jsonStr,
            message: "person object has been created"
        };

        // Return as Response object directly
        return new Response(JSON.stringify(json), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"  // Optional
            },
            status: 200
        });

    } catch (error) {
        // Error handling
        return new Response(JSON.stringify({
            status: "error",
            error: error && typeof error === "object" && "message" in error ? (error as any).message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export default create;