import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge';

const textLanguage = (language: string) => {
    if (language !== "Default") {
        return `The summary will be written in  ${language}`;
    } else {
        return "The summary will be written in the language of the text provided";
    }
}

export async function POST(req: Request) {

    try {
        const { messages, apiKey, language } = await req.json();

        const config = new Configuration({
            apiKey: apiKey
        })

        const openai = new OpenAIApi(config)

        const prompt = [
            {
                role: 'system',
                content: `Summarize the content provided to a student. ${textLanguage(language)}. The first sentence you write will be a short title
                 of no more than 5 words and will be separated from the abstract with a colon. If you consider that the text
                  obtained is not a valid text to create a summary you will say, "I'm sorry, but the text you have provided is
                   not valid." Example: "The Vietnam War: [Text Summary]."`,
            },
        ]

        console.log([...prompt, ...messages])

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [...prompt, ...messages],
            max_tokens: 1000
        });

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream)
    } catch (e) {
        throw (e)
    }
}