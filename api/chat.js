import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'MISTRAL_API_KEY is missing' }),
                { status: 500 }
            );
        }

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages,
            system: systemPrompt || "Tu es un guide expert temporel.",
        });

        // Try standard data stream, then text stream, then raw response
        try { return result.toDataStreamResponse(); } catch (e) {
            try { return result.toTextStreamResponse(); } catch (e2) {
                return new Response(result.textStream, {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
                });
            }
        }
    } catch (error) {
        console.error('API_CRASH:', error);
        return new Response(
            JSON.stringify({ error: 'Server Error', details: error.message }),
            { status: 500 }
        );
    }
}
