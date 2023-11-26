'use client'

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

    return (
        <section className="w-full min-h-screen pt-16 flex flex-col items-center justify-center">
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

            <div className='w-9/12'>
                {messages.map(m => (
                    <div key={m.id} className='p-5'>
                        <span className='text-green-400	'>{m.role === "assistant" ? "Summary" : "Text"}</span>: {m.content}
                    </div>  
                ))}
            </div>
        </section>
    )
}