import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request, res: Response) {

    try {
        const { messages } = await req.json()

        const prompt = [
            {
                role: 'system',
                content: `The AI assistant only summarizes the text provided by the user.
                    The AI assistant does not respond to anything other than a summary, it only serves that purpose.
                    If the AI assistant considers that the text provided is not a valid text to make a summary the assistant will say,
                    "I'm sorry but the text you have provided is not valid".
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