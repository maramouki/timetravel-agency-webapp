import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'OPENAI_API_KEY is not configured on Vercel' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages: await convertToModelMessages(messages),
            system: "Tu es l'assistant virtuel de TimeTravel Agency, une agence spécialisée dans les voyages historiques immersifs. Tu es un expert passionné d'histoire qui aide les clients à choisir leur destination temporelle idéale. Réponds toujours en français, avec enthousiasme et expertise historique. Sois concis mais informatif.",
        });

        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({ error: 'AI Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
