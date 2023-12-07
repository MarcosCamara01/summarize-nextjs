'use client'

import Frame from '@/components/frame/Frame';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { SummaryDoc } from "@/models/Summary"
import FileUpload from './FileUpload';
import { CountTokensResponse, countTokens } from "@/components/count-tokens";
import { useState, useEffect } from "react";
import { saveSummary } from '@/helpers/saveSummary';

export default function CreateSummary() {
    const { data: session } = useSession();
    const [inputTokens, setInputTokens] = useState<null | CountTokensResponse>(null);

    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
        body: {
            apiKey: session?.user?.api
        },
        onFinish: async (message) => {
            try {
                const inputTokens = await countTokens(input);
                const responseOutput = await countTokens(message.content);

                await saveSummary(message.content, session?.user?._id, inputTokens, responseOutput);
            } catch (error) {
                console.error(error);
            }
        },
    });


    useEffect(() => {
        countTokens(input).then((r) => setInputTokens(r))
    }, [input])

    const messagesWithSeparatedTitle = messages.map(m => {
        if (m.role === 'assistant') {
            const separator = ':';
            const separatorIndex = m.content.indexOf(separator);

            if (separatorIndex !== -1) {
                const title = m.content.slice(0, separatorIndex + 1).trim();
                const titleWithoutSeparator = title.replace(':', '').trim();
                const bodyText = m.content.slice(separatorIndex + 1).trim();

                return {
                    title: titleWithoutSeparator,
                    summary: bodyText,
                    userId: session?.user?._id
                }
            }
        }

        return null;
    }) as SummaryDoc[];

    return (
        <>
            {
                messages[1]
                    ?
                    <Frame
                        summary={messagesWithSeparatedTitle[1]}
                    />
                    :
                    <>
                        <form className='w-full flex flex-col items-center justify-center gap-6 px-3.5 min-[350px]:px-6 sm:px-0' onSubmit={handleSubmit}>
                            <textarea
                                className='w-full max-w-3xl max-h-96 min-h-150 p-1.5 rounded bg-background-secondary border border-solid border-border-primary text-sm '
                                value={input}
                                onChange={handleInputChange}
                            />

                            <div className='w-full max-w-3xl m-auto'>
                                <div className='w-full h-[38px]'>
                                    <FileUpload
                                        setInput={setInput}
                                    />
                                </div>
                                <div></div>
                            </div>

                            <button type="submit" className='w-40 bg-background-secondary border border-solid border-border-primary rounded py-1 text-sm transition duration-150 ease hover:bg-color-secondary'>
                                Send
                            </button>

                            {inputTokens ? (
                                inputTokens.error ? (
                                    <p className="text-red-500">{inputTokens.error.message}</p>
                                ) : inputTokens.characters && inputTokens.characters >= 1 ?
                                    (
                                        <div className="space-y-2 text-lg">
                                            <div className="flex justify-between">
                                                <p>Characters</p>
                                                <p className="text-xl">{inputTokens.characters}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>Words</p>
                                                <p className="text-xl">{inputTokens.words}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>Tokens</p>
                                                <p className="text-xl font-bold">{inputTokens.tokens_count}</p>
                                            </div>
                                        </div>
                                    )
                                    : ""
                            ) : null}
                        </form>
                    </>
            }
        </>
    )
}