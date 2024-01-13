'use client'

import Frame from '@/components/frame/Frame';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import FileUpload from './FileUpload';
import { CountTokensResponse, countTokens } from "@/components/count-tokens";
import { useState, useEffect } from "react";
import { saveSummary } from '@/helpers/saveSummary';
import { useSummary } from '@/hooks/SummariesContext';
import { summaryWithTitle } from '@/helpers/summaryWithTitle';
import { LanguageButton } from './ConfigurationButtons';
import { getUserKey } from '@/helpers/UserKey';
import { getSummaries } from '@/helpers/getSummaries';

export default function CreateSummary() {
    const { data: session } = useSession();
    const [inputTokens, setInputTokens] = useState<null | CountTokensResponse>(null);
    const [language, setLanguage] = useState<string>("Default");
    const [apiKey, setApiKey] = useState<string | undefined>();
    const { summariesList, setSummariesList } = useSummary();

    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
        body: {
            apiKey,
            language
        },
        onFinish: async (message) => {
            try {
                const inputTokens = await countTokens(input);
                const responseOutput = await countTokens(message.content);

                const response = await saveSummary(message.content, session?.user?.email, inputTokens, responseOutput);
                if (response !== "Failed to save summary") {
                    if (!summariesList || summariesList.length === 0) {
                        const summaries = await getSummaries();
                        if (summaries) {
                            setSummariesList([...summaries]);
                        }
                    } else {
                        setSummariesList([...summariesList, response]);
                        console.log([...summariesList, response]);
                    }
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        countTokens(input).then((r) => setInputTokens(r));
    }, [input]);

    useEffect(() => {
        const userKey = async () => {
            try {
                const userKey = await getUserKey()
                setApiKey(userKey?.apiKey);
            } catch (error) {
                console.error(error)
            }
        }
        userKey();
    }, []);

    const content = summaryWithTitle(messages[1]?.content);

    return (
        <>
            {
                messages[1] && messages[1]?.content !== "I'm sorry, but the text you have provided is not valid."
                    ?
                    <Frame
                        summary={content}
                    />
                    :

                    <form className='w-full flex flex-col items-center justify-center gap-6 px-3.5 min-[350px]:px-6' onSubmit={handleSubmit}>
                        <textarea
                            className='w-full max-w-3xl max-h-96 min-h-150 p-1.5 rounded bg-background-secondary border border-solid border-border-primary text-sm '
                            value={input}
                            onChange={handleInputChange}
                        />

                        <div className='w-full max-w-3xl flex justify-between gap-5'>
                            <LanguageButton
                                setLanguage={setLanguage}
                            />

                            <div className='w-full max-w-[220px]'>
                                <div className='w-full'>
                                    <FileUpload
                                        setInput={setInput}
                                    />
                                </div>
                                <div></div>
                            </div>
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
            }
        </>
    )
}