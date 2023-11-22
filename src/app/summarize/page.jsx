'use client'

import { useChat } from 'ai/react';

export default function Summarize() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <section className="w-full min-h-screen pt-16 flex flex-col items-center justify-center">
            <form>
                <textarea
                    className='w-max min-w-full max-h-96 max-w-lg p-1.5 rounded bg-background-secondary text-sm resize'
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