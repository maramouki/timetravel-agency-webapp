import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const config = {
    runtime: 'edge', // Using Edge for better performance and standard Web Request/Response
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            console.error('MISTRAL_API_KEY is missing');
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
            JSON.stringify({ error: 'Internal Server Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
