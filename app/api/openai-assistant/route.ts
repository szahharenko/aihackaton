import {NextRequest} from 'next/server'
import OpenAI from 'openai'

export async function POST(request:NextRequest) {
    const newMessage = await request.json();
    const openai = new OpenAI();
    if (newMessage.threadId == null) {
        const thread = await openai.beta.threads.create();
        newMessage.threadId = thread.id;
    }
    await openai.beta.threads.messages.create(
        newMessage.threadId,
        {
            role: "user",
            content: newMessage.content
        }
    );
    const stream = await openai.beta.threads.runs.create(
        newMessage.threadId,
        {assistant_id: newMessage.assistantId, stream:true}
    );
    return new Response(stream.toReadableStream());
}
