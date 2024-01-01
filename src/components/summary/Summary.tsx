"use client"

import { SummaryDoc } from '@/models/Summary';
import React from 'react';

export const Summary = ({ summary }: { summary: SummaryDoc | undefined }) => {
    return (
        <div className="max-w-screen-lg">
            <h3 className="text-center text-xl font-bold mb-6">{summary?.title}</h3>
            <p>{summary?.summary}</p>
        </div>
    );
};