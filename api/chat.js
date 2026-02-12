import { mistral } from '@ai-sdk/mistral';
import { generateText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const body = await req.json();
        const { messages, systemPrompt } = body;

        if (!process.env.MISTRAL_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'MISTRAL_API_KEY is not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Normalise messages from AI SDK v6 format (parts) to standard format
        const cleanMessages = (messages || []).map(m => {
            let text = "";
            if (typeof m.content === 'string') text = m.content;
            else if (m.parts && Array.isArray(m.parts)) {
                text = m.parts.map(p => typeof p === 'string' ? p : (p.text || "")).join("");
            } else if (m.text) text = m.text;

            return { role: m.role || 'user', content: text || " " };
        });

        // Use generateText (non-streaming) to avoid toDataStreamResponse crash
        const { text } = await generateText({
            model: mistral('mistral-small-latest'),
            messages: cleanMessages,
            system: systemPrompt || "Tu es l'assistant de TimeTravel Agency, expert en voyages temporels dans l'histoire.",
        });

        // Return as a simple data stream format that useChat can parse
        // Format: https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                // Send text part
                controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
                // Send finish message
                controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                // Send done message
                controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`));
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Vercel-AI-Data-Stream': 'v1',
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({ error: 'AI Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
