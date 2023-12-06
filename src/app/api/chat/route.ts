import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge';

export async function POST(req: Request) {

    try {
        const { messages, apiKey, userId, inputTokens } = await req.json();

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
                                inputTokens
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