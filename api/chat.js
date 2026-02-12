import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'MISTRAL_API_KEY is not configured on Vercel' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages,
            system: systemPrompt,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
