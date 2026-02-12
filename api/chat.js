import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        // Security check for API Key (logged as boolean for safety)
        const hasKey = !!process.env.MISTRAL_API_KEY;
        console.log('API Key configured:', hasKey);

        if (!hasKey) {
            return new Response(
                JSON.stringify({ error: 'MISTRAL_API_KEY is not set in Vercel environment variables' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Normalize messages to ensure a clean prompt for the AI
        const normalizedMessages = messages.map(m => {
            let content = "";
            if (typeof m.content === 'string') content = m.content;
            else if (m.parts && Array.isArray(m.parts)) {
                content = m.parts.map(p => p.text || p.content || "").join("");
            } else if (m.text) content = m.text;

            return {
                role: m.role === 'assistant' ? 'assistant' : 'user',
                content: content || "Message vide"
            };
        });

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages: normalizedMessages,
            system: systemPrompt || "Tu es l'assistant de TimeTravel Agency, expert en voyages temporels.",
        });

        // Use the most robust response method
        return result.toDataStreamResponse();

    } catch (error) {
        console.error('SERVER_ERROR:', error);
        return new Response(
            JSON.stringify({ error: 'Server Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
