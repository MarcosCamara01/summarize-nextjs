'use client'

import Frame from '@/components/frame/Frame';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { SummaryDoc } from "@/models/Summary"

export default function Summarize() {
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
        <section className="w-full min-h-80vh flex flex-col items-center justify-center">
            {messages[1]
                ?
                <Frame
                    summary={messagesWithSeparatedTitle[1]}
                />
                :
                <>
                    <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                        <textarea
                            className='w-full max-w-3xl max-h-96 min-h-150 p-1.5 rounded bg-background-secondary text-sm resize'
                            value={input}
                            onChange={handleInputChange}
                        />

                        <button type="submit">
                            Send
                        </button>
                    </form>
                </>
            }
        </section>
    )
}