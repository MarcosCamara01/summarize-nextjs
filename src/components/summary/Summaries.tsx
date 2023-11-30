import { SummaryDoc } from '@/models/Summary';
import Link from 'next/link';
import React from 'react';

const truncateSummary = (text: string, limit: number) => {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
};

export const Summaries = ({ summaries }: { summaries: any }) => {
    return (
        <div className='max-w-5xl m-auto grid grid-cols-auto-fill-250 items-center justify-between gap-7'>
            {summaries.map((summary: SummaryDoc) => (
                <Link href={`/summaries/${summary._id}`} key={summary._id} className='py-7 px-5 border border-solid border-border-primary bg-background-secondary rounded transition duration-150 ease hover:bg-color-secondary'>
                    <h2 className='text-lg font-semibold truncate mb-3'>{summary.title}</h2>
                    <p className='text-sm'>{truncateSummary(summary.summary, 100)}</p>
                </Link>
            ))}
        </div>
    );
};