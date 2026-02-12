import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
    const { messages, systemPrompt } = await req.json();

    const result = await streamText({
        model: mistral('mistral-small-latest'),
        messages,
        system: systemPrompt,
    });

    return result.toDataStreamResponse();
}
