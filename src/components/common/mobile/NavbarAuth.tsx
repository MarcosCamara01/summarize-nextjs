"use client"

import React from 'react';
import { useSidebar } from '@/hooks/SidebarContext';
import { useSession } from 'next-auth/react';
import { RiMenu4Fill, RiCloseFill, RiBookReadLine } from "react-icons/ri";
import { PiBrain } from "react-icons/pi";
import { FaRegLightbulb } from "react-icons/fa";
import Link from 'next/link';
import { PersonalButton } from '../../account/PersonalButton';
import { KeyButton } from '../../account/KeyButton';

export const NavbarAuth = () => {
    const { isNavbarOpen, setisNavbarOpen } = useSidebar();
    const { data: session, status } = useSession();

    const toggleSidebar = () => {
        setisNavbarOpen(!isNavbarOpen);
    };

    const linksData = [
        { path: '/create', name: 'Create', icon: <FaRegLightbulb className="text-xl min-w-[20px]" /> },
        { path: '/summaries', name: 'Summaries', icon: <RiBookReadLine className="text-xl min-w-[20px]" /> },
    ];

    return (
        <>
            <div className={`bg-black py-5 px-3.5 z-10 border-r border-solid border-border-primary fixed h-full w-full
                transition duration-100 ease ${isNavbarOpen ? "translate-x-0" : "translate-x-hide overflow-hidden"}`}>
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
                                    onClick={toggleSidebar}
                                >
                                    <div className='h-8 p-1.5 flex items-center gap-3'>
                                        {link.icon}
                                        <span className="text-sm transition-opacity duration-150 delay-100 ease-in-out">
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
                                        isSidebarOpen={true}
                                        isMobile={true}
                                    />
                                    <PersonalButton
                                        isSidebarOpen={true}
                                        isMobile={true}
                                        session={session}
                                    />
                                </>
                        }
                    </ul>
                </nav>
            </div>

            <header className='absolute top-0 p-4 w-full flex items-center justify-between z-10 bg-black border-b border-solid border-border-primary'>
                <Link href="https://platform.openai.com/" target='_blank'>
                    <PiBrain
                        className="text-3xl"
                    />
                </Link>

                <button onClick={toggleSidebar}>
                    {
                        isNavbarOpen ?
                            <RiCloseFill
                                className="text-2xl"
                            />
                            :
                            <RiMenu4Fill
                                className="text-2xl"
                            />
                    }
                </button>
            </header>
        </>
    )
}
