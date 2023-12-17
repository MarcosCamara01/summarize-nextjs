"use client"

import React from 'react';
import { useSidebar } from '@/hooks/SidebarContext';
import { useSession } from 'next-auth/react';
import { RiBookReadLine } from "react-icons/ri";
import { PiBrain } from "react-icons/pi";
import { FaRegLightbulb } from "react-icons/fa";
import Link from 'next/link';
import { PersonalButton } from '../../account/PersonalButton';
import { KeyButton } from '../../account/KeyButton';

export const Sidebar = () => {
    const { isSidebarOpen, setSidebarOpen, isMobile } = useSidebar();
    const { data: session, status } = useSession();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const linksData = [
        { path: '/create', name: 'Create', icon: <FaRegLightbulb className="text-xl min-w-[20px]" /> },
        { path: '/summaries', name: 'Summaries', icon: <RiBookReadLine className="text-xl min-w-[20px]" /> },
    ];

    return (
        <>
            <div className={`bg-black py-5 px-3.5 z-10 border-r border-solid border-border-primary fixed h-full
                ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
                <nav className='flex flex-col justify-between items-center h-full'>
                    <ul className='w-full flex flex-col gap-2'>
                        <li className='mb-5'>
                            <Link href="https://platform.openai.com/" target='_blank'>
                                <PiBrain
                                    className="text-3xl"
                                />
                            </Link>
                        </li>
                        {linksData.map((link, index) => (
                            <li key={index} className='h-8 rounded transition duration-150 ease hover:bg-color-secondary'>
                                <Link
                                    href={link.path}
                                >
                                    <div className='h-8 p-1.5 flex items-center gap-3'>
                                        {link.icon}
                                        <span className={`text-sm transition-opacity duration-150 delay-100 ease-in-out ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                                            {link.name}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul className='w-full flex flex-col gap-2'>
                        {
                            status === "loading" ?
                                <>
                                    <div className='w-full h-5 rounded-sm shine'></div>
                                    <div className='w-full h-5 rounded-sm shine'></div>
                                </>
                                :
                                <>
                                    <KeyButton
                                        isSidebarOpen={isSidebarOpen}
                                        isMobile={isMobile}
                                    />
                                    <PersonalButton
                                        isSidebarOpen={isSidebarOpen}
                                        isMobile={isMobile}
                                        session={session}
                                    />
                                </>
                        }
                    </ul>
                </nav>
            </div>

            <button
                className={`fixed top-[45%] w-8 h-[72px] flex items-center btn-sidebar ${isSidebarOpen ? "left-[200px]" : "left-[60px]"}`}
                onClick={toggleSidebar}
            >
                <div className='h-8 w-8 flex flex-col items-center'>
                    <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${isSidebarOpen ? "btn-close-top" : "btn-open-top"}`}></div>
                    <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${isSidebarOpen ? "btn-close-bottom" : "btn-open-bottom"}`}></div>
                </div>
            </button>
        </>
    );
};
