'use client';

import React, { PropsWithChildren, memo } from 'react';
import { useSidebar } from "@/hooks/SidebarContext";
import { Sidebar } from '@/components/common/desktop/Sidebar';

export default memo(({ children }: PropsWithChildren) => {
    const { isSidebarOpen } = useSidebar();

    return (
        <div
            className="sm:flex block justify-between"
        >
            <Sidebar />
            <main
                className={`min-h-screen absolute top-0 right-0 z-[-1] ${isSidebarOpen ? "main-sbopen" : "main-full"}`}
            >
                {children}
            </main>
        </div>
    )
});