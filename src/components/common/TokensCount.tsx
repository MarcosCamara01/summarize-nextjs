"use client"

import { getSummaries } from '@/helpers/getSummaries';
import { useSummary } from '@/hooks/SummariesContext';
import { SummaryDoc } from '@/models/Summary';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { BsDiamondFill } from "react-icons/bs";

export const TokensCount = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
    const [totalTokens, setTotalTokens] = useState({ inputTokens: 0, outputTokens: 0 });
    const { summariesList } = useSummary();
    const [tokensPrice, setTokensPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const liRef = useRef<HTMLLIElement>(null);

    const fetchTokens = async () => {
        try {
            const summaries = await getSummaries();

            if (summaries !== undefined && summaries.length > 0) {
                saveTokens(summaries);
            }
        } catch (error) {
            console.error('Error obtaining tokens:  ', error);
        }
    };

    const tokenCountPrice = () => {
        if (totalTokens.inputTokens > 0 || totalTokens.outputTokens > 0) {
            const inputCost = (totalTokens.inputTokens / 1000) * 0.0030;
            const outputCost = (totalTokens.outputTokens / 1000) * 0.0060;

            const totalCost = inputCost + outputCost;

            setTokensPrice(totalCost)
        }
    };

    const saveTokens = (summaries: SummaryDoc[]) => {
        let totalInputTokens = 0;
        let totalOutputTokens = 0;

        summaries.forEach(summary => {
            totalInputTokens += summary.inputTokens || 0;
            totalOutputTokens += summary.outputTokens || 0;
        });

        setTotalTokens({
            inputTokens: totalInputTokens,
            outputTokens: totalOutputTokens,
        });
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'm';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    };

    useEffect(() => {
        if (totalTokens.inputTokens === 0 && totalTokens.outputTokens === 0) {
            fetchTokens();
        } else if (summariesList.length > 0) {
            saveTokens(summariesList);
        }
    }, [summariesList]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                liRef.current &&
                !ref.current.contains(event.target as Node) &&
                !liRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        tokenCountPrice();
    }, [totalTokens]);

    return (
        <>
            <li
                className='rounded w-full transition duration-150 ease hover:bg-color-secondary'
                ref={liRef}
            >
                <button
                    className='w-full h-8 p-1.5 flex items-center gap-3'
                    onClick={() => setOpen(!open)}
                >
                    <BsDiamondFill className="text-xl min-w-[20px]" />
                    <span className={`text-sm transition-opacity duration-150 delay-100 ease-in-out 
                                    ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    >
                        Total tokens
                    </span>
                </button>
            </li>

            {open && (
                <div
                    ref={ref}
                    className='fixed bottom-[140px] left-2 border border-solid border-border-primary rounded bg-black'
                >
                    <div className='py-1.5 px-3.5'>
                        <div className='text-sm	font-medium'>
                            {formatNumber(totalTokens.inputTokens)} Input tokens
                        </div>
                        <div className='text-sm	font-medium mt-1'>
                            {formatNumber(totalTokens.outputTokens)} Output tokens
                        </div>
                    </div>

                    <div className='py-1.5 px-3.5 text-sm border-y border-solid border-border-primary'>
                        Total cost: {tokensPrice.toFixed(2)}
                    </div>

                    <Link
                        href="#"
                        className='w-full block py-1.5 px-3.5 text-sm transition duration-150 ease hover:bg-color-secondary'
                    >
                        View More
                    </Link>
                </div>
            )}
        </>
    )
}