"use client"

import { SummaryDoc } from '@/models/Summary';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from "react";
import { DeleteSummary } from './DeleteSummary';
import { useSummary } from '@/hooks/SummariesContext';

export const Summaries = ({ summaries }: { summaries: SummaryDoc[] | undefined }) => {
    const { summariesList, setSummariesList } = useSummary();
    const [summaryIdToDelete, setSummaryIdToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (summariesList?.length === 0) {
            setSummariesList(summaries);
        }
    }, [summariesList])

    const handleHover = (summaryId: string) => {
        setSummaryIdToDelete(summaryId);
    };

    const handleLeave = () => {
        setSummaryIdToDelete(null);
    };

    const onDelete = (deletedSummaryId: string) => {
        setSummariesList((prevSummaries: SummaryDoc[]) => prevSummaries
            .filter((summary: SummaryDoc) => summary._id !== deletedSummaryId));
    };

    return (
        <div className='max-w-5xl m-auto grid grid-cols-auto-fill-250 items-center justify-between gap-7'>
            {summariesList?.map((summary: SummaryDoc) => (
                <div
                    key={summary._id}
                    className='p-5 border border-solid border-border-primary bg-background-secondary rounded transition duration-150 ease hover:bg-color-secondary relative'
                    onMouseEnter={() => handleHover(summary._id)}
                    onMouseLeave={handleLeave}
                >
                    <Link href={`/summaries/${summary._id}`}>
                        <h2 className='text-lg font-semibold truncate mb-3'>{summary.title}</h2>
                        <p className='text-sm overflow-hidden line-clamp-2 h-10'>{summary.summary}</p>
                    </Link>

                    <DeleteSummary
                        summaryId={summary._id}
                        summaryIdToDelete={summaryIdToDelete}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
};