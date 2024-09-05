// import {Configuration, OpenAIApi} from 'openai-edge'
// import {OpenAIStream, StreamingTextResponse} from 'ai'

// export const runtime = 'edge'

// const config = new Configuration({
//     apiKey: process.env.OPEN_API_KEY,
// })

// const openai = new OpenAIApi(config)

// export async function POST(req: Request) {
//     try {
//        const {messages} = await req.json()
//        const response = await openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages,
//         stream: true,
//     });
//     const stream = OpenAIStream(response)
//     return new StreamingTextResponse(stream)
//     }  catch (error) {

//     }
// }


// import { CoreMessage, streamText } from 'ai';
// import { openai } from '@ai-sdk/openai';


// export async function POST(req: Request) {
//   const { messages }: { messages: CoreMessage[] } = await req.json();

//   const result = await streamText({
//     model: openai('gpt-4'),
//     system: 'You are a helpful assistant.',
//     messages,
//   });

//   return result.toDataStreamResponse();
// }

// import { CoreMessage, generateText } from 'ai';
// import { openai } from '@ai-sdk/openai';

// export async function POST(req: Request) {
//   const { messages }: { messages: CoreMessage[] } = await req.json();

//   const { responseMessages } = await generateText({
//     model: openai('gpt-3.5-turbo', { apiKey: process.env.OPENAI_API_KEY }),
//     system: 'You are a helpful assistant.',
//     messages,
//   });

//   return Response.json({ messages: responseMessages });
// }

import OpenAI from 'openai';
import { AssistantResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID environment is not set');
          })(),
      });

      await forwardStream(runStream);
    },
  );
}