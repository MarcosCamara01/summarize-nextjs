import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge';

export async function POST(req: Request) {

    try {
        const { messages, apiKey } = await req.json();

        const config = new Configuration({
            apiKey: apiKey
        })

        const openai = new OpenAIApi(config)

        const prompt = [
            {
                role: 'system',
                content: `Summarize the content provided to a student.
                            The first sentence you write will be a short title of no more than 5 words and will be separated from the abstract with a colon.
                            If you consider that the text obtained is not a valid text to create a summary you will say, "I'm sorry, but the text you have provided is not valid." 
                            Example: "The Vietnam War: [Text Summary]."
                `,
            },
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [...prompt, ...messages],
            max_tokens: 1000
        })

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream)
    } catch (e) {
        throw (e)
    }
}