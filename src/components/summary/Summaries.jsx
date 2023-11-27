"use client"

import React, { useState } from 'react';
import { Drawer } from "vaul";

const truncateSummary = (text, limit) => {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
};

export const Summaries = ({ summaries }) => {
    const [selectedSummary, setSelectedSummary] = useState(null);

    const openDrawer = (summary) => {
        setSelectedSummary(summary);
    };

    return (
        <Drawer.Root shouldScaleBackground>
            <div className='grid grid-cols-auto-fill-250 items-center justify-between gap-7'>
                {summaries.map((summary) => (
                    <Drawer.Trigger asChild key={summary._id}>
                        <button onClick={() => openDrawer(summary)} className='py-7 px-5 border border-solid border-border-primary bg-background-secondary rounded transition duration-150 ease hover:bg-color-secondary'>
                            <h2 className='text-lg font-semibold truncate mb-3'>{summary.title}</h2>
                            <p className='text-sm'>{truncateSummary(summary.summary, 110)}</p>
                        </button>
                    </Drawer.Trigger>
                ))}
            </div>

            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                        <div className="max-w-5xl mx-auto">
                            <Drawer.Title className="text-xl font-bold mb-4 text-zinc-600 text-center">
                                {selectedSummary?.title}
                            </Drawer.Title>
                            <p className="text-zinc-600 mb-2">
                                {selectedSummary?.summary}
                            </p>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};
