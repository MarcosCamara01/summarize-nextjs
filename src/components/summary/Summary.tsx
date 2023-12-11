"use client"

import { SummaryDoc } from '@/models/Summary';
import React, { useEffect } from 'react';
import { DeleteSummary } from './DeleteSummary';
import { useSummary } from '@/hooks/SummariesContext';

export const Summary = ({ summary }: { summary: SummaryDoc | undefined }) => {
    const { setSummariesList } = useSummary();

    const onDelete = (deletedSummaryId: string) => {
        setSummariesList((prevSummaries: SummaryDoc[]) => prevSummaries
            .filter((summary: SummaryDoc) => summary._id !== deletedSummaryId));
    };

    return (
        <div className="max-w-screen-lg bg-background-secondary rounded border border-solid border-border-primary p-7">
            <h3 className="text-center text-xl font-bold mb-6">{summary?.title}</h3>
            <p>{summary?.summary}</p>
        </div>
    );
};