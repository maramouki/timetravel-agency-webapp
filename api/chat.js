import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const body = await req.json();
        const { messages, systemPrompt } = body;

        if (!process.env.OPENAI_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'OPENAI_API_KEY is not configured on Vercel' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Normalise messages from SDK v6 format (parts) to standard format
        const cleanMessages = (messages || []).map(m => {
            let text = "";
            if (typeof m.content === 'string') text = m.content;
            else if (m.parts && Array.isArray(m.parts)) {
                text = m.parts.map(p => typeof p === 'string' ? p : (p.text || "")).join("");
            } else if (m.text) text = m.text;

            return { role: m.role || 'user', content: text || " " };
        });

        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            messages: cleanMessages,
            system: systemPrompt || "Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyages temporels fictive. Tu es un expert passionné d'histoire qui aide les clients à choisir leur destination temporelle idéale. Réponds toujours en français, avec enthousiasme et expertise historique. Sois concis mais informatif.",
        });

        // Build manual data stream response compatible with useChat
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
                controller.enqueue(encoder.encode(`e:${JSON.stringify({ finishReason: "stop", usage: { promptTokens: 0, completionTokens: 0 } })}\n`));
                controller.enqueue(encoder.encode(`d:${JSON.stringify({ finishReason: "stop" })}\n`));
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
