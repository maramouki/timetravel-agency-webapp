import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

// Using names POST export for better Vercel/Vite compatibility
export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'MISTRAL_API_KEY is not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages: messages,
            system: systemPrompt || "Tu es un guide expert temporel.",
        });

        // Use toDataStreamResponse if available, otherwise fallback to toTextStreamResponse
        if (typeof result.toDataStreamResponse === 'function') {
            return result.toDataStreamResponse();
        } else if (typeof result.toTextStreamResponse === 'function') {
            return result.toTextStreamResponse();
        } else {
            // Ultimate fallback for very new/old versions
            const stream = result.textStream || result.fullStream;
            return new Response(stream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        }
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(
            JSON.stringify({ error: 'Server Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

// Runtime configuration
export const runtime = 'edge';
