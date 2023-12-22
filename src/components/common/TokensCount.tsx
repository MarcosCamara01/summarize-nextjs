"use client"

import { getSummaries } from '@/helpers/getSummaries';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const TokensCount = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
    const [totalTokens, setTotalTokens] = useState({ inputTokens: 0, outputTokens: 0 });

    const getTokens = async () => {
        try {
            const summaries = await getSummaries();

            if (summaries !== undefined && summaries.length > 0 && totalTokens.inputTokens === 0) {
                let totalInputTokens = 0;
                let totalOutputTokens = 0;

                summaries.forEach(summary => {
                    totalInputTokens += summary.inputTokens || 0;
                    totalOutputTokens += summary.outputTokens || 0;
                });

                setTotalTokens({
                    inputTokens: totalInputTokens,
                    outputTokens: totalOutputTokens
                });
            }
        } catch (error) {
            console.error('Error obtaining tokens:  ', error);
        }
    };

    useEffect(() => {
        getTokens();
    }, []);

    return (
        <>
            <li className='rounded w-full transition duration-150 ease hover:bg-color-secondary'>
                <Link
                    href="/summaries"
                    className={`py-1.5 w-full h-[31px] flex items-center gap-3`}
                >
                    <div className='text-sm max-h-[32px] min-w-[31px] flex items-center justify-center'>{totalTokens.inputTokens}</div>
                    <span
                        className={`text-sm transition-opacity duration-150 delay-100 ease-in-out 
                            ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    >Input Tokens</span>
                </Link>
            </li>
            <li className='rounded w-full transition duration-150 ease hover:bg-color-secondary'>
                <Link
                    href="/summaries"
                    className={`py-1.5 w-full h-[31px] flex items-center gap-3`}
                >
                    <div className='text-sm max-h-[32px] min-w-[31px] flex items-center justify-center'>{totalTokens.outputTokens}</div>
                    <span
                        className={`text-sm transition-opacity duration-150 delay-100 ease-in-out 
                            ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    >Output Tokens</span>
                </Link>
            </li>
        </>
    )
}