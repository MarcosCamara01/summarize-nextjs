'use client'

import Frame from '@/components/frame/Frame';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { SummaryDoc } from "@/models/Summary"

export default function CreateSummary() {
    const { data: session } = useSession();
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            api: session?.user?.api,
            userId: session?.user?._id
        }
    });

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
            {messages[1]
            ?
            <Frame
                summary={messagesWithSeparatedTitle[1]}
            />
            :
            <>
                <form className='w-full flex flex-col items-center justify-center gap-6 px-3.5 min-[350px]:px-6 sm:px-0' onSubmit={handleSubmit}>
                    <textarea
                        className='w-full max-w-3xl max-h-96 min-h-150 p-1.5 rounded bg-background-secondary border border-solid border-border-primary text-sm resize'
                        value={input}
                        onChange={handleInputChange}
                    />

                    <button type="submit" className='w-40 bg-background-secondary border border-solid border-border-primary rounded py-1 text-sm transition duration-150 ease hover:bg-color-secondary'>
                        Send
                    </button>
                </form>
            </>
        }
        </>
    )
}