'use client'

import { useSidebar } from "@/hooks/SidebarContext";
import { Sidebar } from '@/components/common/Sidebar';

export default function FlexMain({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, isMobile } = useSidebar();

    return (
        <div
            className="sm:flex block justify-between"
        >
            <Sidebar />
            <main
                className={`min-h-screen px-3.5 min-[350px]:px-6 sm:px-12 py-24 absolute top-0 right-0 ${isSidebarOpen && !isMobile ? "sidebar-open" : "main-full"}`}
            >
                {children}
            </main>
        </div>
    )
}