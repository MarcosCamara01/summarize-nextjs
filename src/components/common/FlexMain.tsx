'use client'

import { useSidebar } from "@/hooks/SidebarContext";
import { Sidebar } from '@/components/common/desktop/Sidebar';

export default function FlexMain({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, isMobile } = useSidebar();

    return (
        <div
            className="sm:flex block justify-between"
        >
            <Sidebar />
            <main
                className={`min-h-screen absolute top-0 right-0 z-[-1]
                ${!isMobile ? isSidebarOpen ? "main-sbopen" : "main-full" : "w-full"}`}
            >
                {children}
            </main>
        </div>
    )
}