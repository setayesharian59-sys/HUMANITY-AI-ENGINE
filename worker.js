
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "https://setayesharian59-sys.github.io",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "POST") {
      return Response.json(
        { status: "HUMANITY AI ENGINE is ready" },
        { headers: cors }
      );
    }

    try {
      const body = await request.json();
      const prompt = body.prompt;

      if (!prompt || typeof prompt !== "string" || prompt.length > 2048) {
        return Response.json(
          { error: "Please enter a valid prompt." },
          { status: 400, headers: cors }
        );
      }

      const result = await env.AI.run(
        "@cf/black-forest-labs/flux-1-schnell",
        { prompt, steps: 4 }
      );

      return Response.json(
        {
          image: `data:image/jpeg;base64,${result.image}`
        },
        { headers: cors }
      );
    } catch (error) {
      return Response.json(
        { error: "Image generation failed. Check the AI binding." },
        { status: 500, headers: cors }
      );
    }
  }
};
