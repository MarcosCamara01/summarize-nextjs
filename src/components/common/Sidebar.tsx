"use client"

import React from 'react';
import { useSidebar } from '@/hooks/SidebarContext';
import { useSession } from 'next-auth/react';
import { IoMdBook } from "react-icons/io";
import { RiOpenaiFill } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import Link from 'next/link';

export const Sidebar = () => {
    const { isSidebarOpen, setSidebarOpen, isMobile } = useSidebar();
    const { data: session, status } = useSession();
    const firstLetter = (session?.user?.name?.charAt(0) || '').toUpperCase();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleMobile = () => {
        if (isMobile) {
            toggleSidebar();
        }
    };

    const linksData = [
        { path: '/summaries', name: 'Summaries', icon: <IoMdBook className="text-xl min-w-[20px]" /> },
        { path: '/create', name: 'Create', icon: <FaRegLightbulb className="text-xl min-w-[20px]" /> },
    ];

    return (
        <>
            <div className={`bg-background-secondary py-5 px-3.5 z-10 border-r border-solid border-border-primary fixed h-full sidebar
                            ${isMobile ? 'h-full w-full' : ''} ${isSidebarOpen && !isMobile ? 'sidebar-open' : 'sidebar-close'}`}>
                <nav className='flex flex-col justify-between items-center h-full'>
                    <ul className='w-full flex flex-col gap-2'>
                        <li className='mb-5'>
                            <Link href="#">
                                <RiOpenaiFill
                                    className="text-3xl"
                                />
                            </Link>
                        </li>
                        {linksData.map((link, index) => (
                            <li key={index} className='h-8 rounded transition duration-150 ease hover:bg-color-secondary'>
                                <Link
                                    href={link.path}
                                    onClick={toggleMobile}
                                >
                                    <div className='h-8 p-1.5 flex items-center gap-3'>
                                        {link.icon}
                                        {isSidebarOpen && !isMobile ? <span className='text-sm'>{link.name}</span> : ""}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul className='w-full'>
                        {
                            status === "loading" ?
                                <div className='h-5 rounded-sm w-14 shine'></div>
                                :

                                <li className='rounded w-full transition duration-150 ease hover:bg-color-secondary'>
                                    <button
                                        className='p-1.5 text-sm w-full h-full flex items-center gap-3'
                                    >
                                        <div className='bg-white text-black text-xs min-w-[20px] rounded-full h-5 w-5 flex items-center justify-center'>{firstLetter}</div>
                                        {isSidebarOpen && !isMobile ? "Personal" : ""}
                                    </button>
                                </li>
                        }
                    </ul>
                </nav>
            </div >

            <button className={`fixed z-10 top-[45%] w-8 h-[72px] flex items-center btn-sidebar ${isSidebarOpen && !isMobile ? "left-[200px]" : "left-[60px]"}`} onClick={toggleSidebar}>
                <div className='h-8 w-8 flex flex-col items-center'>
                    <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${isSidebarOpen && !isMobile ? "btn-close-top" : "btn-open-top"}`}></div>
                    <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${isSidebarOpen && !isMobile ? "btn-close-bottom" : "btn-open-bottom"}`}></div>
                </div>
            </button>
        </>
    );
};
