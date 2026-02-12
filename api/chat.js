import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            console.error('MISSING MISTRAL_API_KEY');
            return new Response(JSON.stringify({ error: 'MISTRAL_API_KEY missing' }), { status: 500 });
        }

        // Normalisation ultra-propre pour Mistral
        const cleanMessages = messages.map(m => {
            let content = "";
            if (typeof m.content === 'string') content = m.content;
            else if (m.parts && Array.isArray(m.parts)) {
                content = m.parts.map(p => typeof p === 'string' ? p : (p.text || "")).join("");
            } else if (m.text) content = m.text;

            return {
                role: m.role === 'assistant' ? 'assistant' : 'user',
                content: content || " "
            };
        });

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages: cleanMessages,
            system: systemPrompt || "Tu es l'assistant de TimeTravel Agency.",
        });

        // STRATÉGIE DE RÉPONSE ULTRA DÉFENSIVE
        // On teste les fonctions une par une pour éviter le crash "is not a function"

        if (typeof result.toDataStreamResponse === 'function') {
            console.log('Using toDataStreamResponse');
            return result.toDataStreamResponse();
        }

        if (typeof result.toTextStreamResponse === 'function') {
            console.log('Using toTextStreamResponse');
            return result.toTextStreamResponse();
        }

        if (typeof result.toAIStreamResponse === 'function') {
            console.log('Using toDataStreamResponse (alias)');
            return result.toAIStreamResponse();
        }

        // Fallback ULTIME : Flux brut
        console.log('Using raw stream fallback');
        return new Response(result.textStream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Vercel-AI-Stream': 'true'
            }
        });

    } catch (error) {
        console.error('CRITICAL SERVER ERROR:', error);
        return new Response(JSON.stringify({
            error: 'Server Error',
            details: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
