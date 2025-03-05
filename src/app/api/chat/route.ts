export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ message: "Message is required" }), {
        status: 400,
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-7-sonnet-20250219",
        messages: [{ role: "user", content: message }],
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!data || !data.content) {
      return new Response(
        JSON.stringify({ message: "Invalid response from Claude", data }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ reply: data.content }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
}
