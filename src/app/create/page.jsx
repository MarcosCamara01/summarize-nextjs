'use client'

import { Summary } from '@/components/summary/Summary';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';

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
                    content: bodyText,
                };
            }
        }

        return m;
    });

    return (
        <section className="w-full min-h-80vh flex flex-col items-center justify-center">
            {messages[1]
                ?
                <Summary
                    title={messagesWithSeparatedTitle[1]?.title ? messagesWithSeparatedTitle[1].title : "No title"}
                    summary={messagesWithSeparatedTitle[1]?.content}
                />
                :
                <>
                    <form className='w-full flex items-center justify-center'>
                        <textarea
                            className='w-full max-w-3xl max-h-96 min-h-150 p-1.5 rounded bg-background-secondary text-sm resize'
                            value={input}
                            onChange={handleInputChange}
                        />
                    </form>
                    <button onClick={handleSubmit}>
                        Send
                    </button>
                </>
            }
        </section>
    )
}