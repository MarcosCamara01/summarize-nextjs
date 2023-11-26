import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge';

export async function POST(req: Request) {

    try {
        const { messages, api, userId } = await req.json();

        const config = new Configuration({
            apiKey: api
        })

        const openai = new OpenAIApi(config)

        const prompt = [
            {
                role: 'system',
                content: `The first sentence written by the AI assistant will be the title of the text provided by the user and the title will be followed by a colon.
                    After making the title, the AI assistant will make a summary of the text with all relevant information summarized.
                    The AI assistant does not answer anything other than a summary and a title, that is all it is good for.
                    If the AI assistant considers that the text provided is not a valid text to make a summary the assistant will say, "I'm sorry, but the text you have provided is not valid."
                    The AI wizard cannot start the summary with "Summary of" in any language.
                `,
            },
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [...prompt, ...messages]
        })

        const stream = OpenAIStream(response, {
            onCompletion: async (completion: string) => {
                const separator = ':';
                const separatorIndex = completion.indexOf(separator);
                const title = completion.slice(0, separatorIndex + 1).trim();
                const bodyText = completion.slice(separatorIndex + 1).trim();
                const titleWithoutSeparator = title.replace(':', '').trim();

                if (bodyText !== "I'm sorry, but the text you have provided is not valid.") {
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                title: titleWithoutSeparator,
                                summary: bodyText,
                                userId,
                            }),
                        });

                        if (response.ok) {
                            const data = await response.json();
                            console.log('Summary saved with ID:', data.id);
                        } else {
                            console.error('Failed to save summary');
                        }
                    } catch (error) {
                        console.error('Error while saving summary:', error);
                    }
                } else {
                    console.log('Text provided is not valid.');
                }
            },

        });
        return new StreamingTextResponse(stream)
    } catch (e) {
        throw (e)
    }
}