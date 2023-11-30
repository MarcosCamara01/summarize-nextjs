"use client"

import React from 'react';
import { FiSidebar } from 'react-icons/fi';
import { useSidebar } from '@/hooks/SidebarContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const Sidebar = () => {
    const { isSidebarOpen, setSidebarOpen, isMobile } = useSidebar();
    const { data: session, status } = useSession();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleMobile = () => {
        if (isMobile) {
            toggleSidebar();
        }
    };

    const authLinks = (
        <>
            {
                status === "loading" ?
                    <div className='h-5 rounded-sm w-14 shine'></div>
                    :
                    status === "authenticated" ? (
                        <li>
                            <Link
                                href="/account"
                            >{session?.user?.name?.split(' ')[0]}
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link
                                href="/login"
                            >Login
                            </Link>
                        </li>
                    )
            }
        </>
    );

    const linksData = [
        { path: '/summaries', name: 'SUMMARIES' },
        { path: '/create', name: 'CREATE' },
    ];

    return (
        <>
            <div className={`bg-background-secondary py-4 px-3 transition duration-200 ease z-10 border-r border-solid border-border-primary fixed h-full 
                            ${isMobile ? 'h-full w-full' : ''} ${isSidebarOpen ? 'min-w-[200px] translate-x-0' : 'translate-x-hide overflow-hidden'}`}>
                <nav className='flex flex-col justify-between items-center h-full'>
                    <ul>
                        <button className="border border-solid border-border-primary p-3 flex items-center rounded" onClick={toggleSidebar}>
                            <FiSidebar />
                        </button>
                        {linksData.map((link, index) => (
                            <li key={index}>
                                <Link href={link.path} onClick={toggleMobile}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>

                    <ul>
                        {authLinks}
                    </ul>
                </nav>
            </div >

            {!isSidebarOpen && (
                <button className="fixed z-10 top-2.5 left-2.5 border border-solid border-border-primary p-3 flex items-center rounded" onClick={toggleSidebar}>
                    <FiSidebar />
                </button>
            )}
        </>
    );
};
