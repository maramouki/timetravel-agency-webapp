import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const { messages, systemPrompt } = await req.json();

        if (!process.env.MISTRAL_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'MISTRAL_API_KEY is not set on Vercel variables' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const cleanMessages = messages.map(m => {
            let text = "";
            if (typeof m.content === 'string') text = m.content;
            else if (m.parts) {
                text = m.parts.map(p => typeof p === 'string' ? p : (p.text || "")).join("");
            } else if (m.text) text = m.text;

            return {
                role: m.role || 'user',
                content: text || " "
            };
        });

        const result = await streamText({
            model: mistral('mistral-small-latest'),
            messages: cleanMessages,
            system: systemPrompt || "Tu es l'assistant de TimeTravel Agency.",
        });

        // Use the most compatible response method (AI SDK 3.x/4.x/5.x+)
        try {
            return result.toDataStreamResponse();
        } catch (e) {
            console.log("Fallback to toTextStreamResponse");
            try { return result.toTextStreamResponse(); } catch (e2) {
                console.log("Fallback to raw stream");
                return new Response(result.textStream, {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            }
        }

    } catch (error) {
        console.error('SERVER_API_CRASH:', error);
        return new Response(
            JSON.stringify({ error: 'Server Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
