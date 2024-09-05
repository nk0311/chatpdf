import {Configuration, OpenAIApi} from 'openai-edge'
import {OpenAIStream, StreamingTextResponse} from 'ai'

export const runtime = 'edge'

const config = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
})

const openai = new OpenAIApi(config)

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

export async function POST(req: Request) {
    try {
        console.log("API Hit"); // For testing if the route is hit
        const { messages } = await req.json();
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            stream: true,
        });
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error("Error in API:", error);
        return new Response('Failed to process request', { status: 500 });
    }
}
