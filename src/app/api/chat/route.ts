import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge';

export async function POST(req: Request) {

    try {
        const { messages, api } = await req.json();

        const config = new Configuration({
            apiKey: api
        })
        const openai = new OpenAIApi(config)

        const prompt = [
            {
                role: 'system',
                content: `The first sentence written by the AI assistant will be the title of the text provided by the user and will be separated by a colon with the text summary.
                 After making the title, the AI assistant will make a summary of the text so that the user can study it but without losing anything relevant.
                 The AI assistant does not answer anything other than a summary and a title, it is only good for that.
                 If the AI assistant considers that the text provided is not a valid text to make a summary the assistant will say, "I'm sorry, but the text you have provided is not valid".
                `,
            },
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [...prompt, ...messages]
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (e) {
        throw (e)
    }
}