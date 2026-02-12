import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            return new Response(JSON.stringify({ error: 'MISTRAL_API_KEY is missing' }), { status: 500 });
        }

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages: messages.map(m => ({
                role: m.role,
                content: m.content || (m.parts && m.parts[0]?.text) || m.text || ""
            })),
            system: systemPrompt || "Tu es un guide expert temporel de TimeTravel Agency.",
        });

        // Forced compatibility for response
        if (result.toDataStreamResponse) return result.toDataStreamResponse();
        if (result.toTextStreamResponse) return result.toTextStreamResponse();

        return new Response(result.textStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });

    } catch (error) {
        console.error('API_CRASH:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
