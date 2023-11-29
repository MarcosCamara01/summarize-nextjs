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
                        <li className='flex items-center justify-center'>
                            <Link
                                href="/account"
                            >{session?.user?.name?.split(' ')[0]}
                            </Link>
                        </li>
                    ) : (
                        <li className='flex items-center justify-center'>
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
            <div className={`h-full bg-background-secondary p-2	transition duration-150 ease-out z-10 fixed border-r border-solid border-border-primary
             ${isSidebarOpen ? 'w-[200px] translate-x-0' : 'translate-x-hide overflow-hidden'} ${isMobile && isSidebarOpen ? 'w-full' : ''}`}>
                <div className="flex items-center">
                    <button className="border border-solid border-border-primary p-3 flex items-center rounded" onClick={toggleSidebar}>
                        <FiSidebar />
                    </button>
                </div>

                <nav>
                    <ul>
                        {linksData.map((link, index) => (
                            <li key={index} className='flex items-center justify-center'>
                                <Link href={link.path} onClick={toggleMobile}>{link.name}</Link>
                            </li>
                        ))}

                        {authLinks}
                    </ul>
                </nav>
            </div >

            {!isSidebarOpen && (
                <button className="fixed top-2.5 left-2.5 border border-solid border-border-primary p-3 flex items-center rounded" onClick={toggleSidebar}>
                    <FiSidebar />
                </button>
            )}
        </>
    );
};
