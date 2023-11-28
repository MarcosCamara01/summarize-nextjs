import React from 'react'

export const Summary = ({ title, summary }: {title: string, summary: string}) => {
    return (
        <div className='w-9/12 m-auto'>
            <h1 className='text-center text-xl font-bold mb-6'>{title}</h1>
            <p>{summary}</p>
        </div>
    )
}