import React, { useState, useEffect, useRef } from 'react';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from 'next/image';

interface PersonalButtonProps {
    isSidebarOpen: boolean;
    isMobile: boolean;
    session: Session | null;
}

export function PersonalButton({ isSidebarOpen, isMobile, session }: PersonalButtonProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const liRef = useRef<HTMLLIElement>(null);
    const firstLetter = (session?.user?.name?.charAt(0) || '').toUpperCase();

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

    return (
        <>
            <li
                className='rounded w-full transition duration-150 ease hover:bg-color-secondary'
                ref={liRef}
            >
                <button
                    className='p-1.5 w-full h-full flex items-center gap-3'
                    onClick={() => setOpen(!open)}
                >
                    <div className='bg-white text-black text-xs min-w-[20px] rounded-full h-5 w-5 flex items-center justify-center overflow-hidden'>
                        {session?.user?.image ? 
                            <Image 
                                src={session?.user?.image}
                                alt={session?.user?.name}
                                width={20}
                                height={20}
                            />
                        : firstLetter}
                    </div>
                    <span className={`text-sm transition-opacity duration-150 delay-100 ease-in-out ${!isMobile ? isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible" : ""}`}>
                        Personal
                    </span>
                </button>
            </li>

            {open && (
                <div
                    ref={ref}
                    className='fixed bottom-14 left-2 border border-solid border-border-primary rounded bg-black'
                >
                    <div className='py-1.5 px-3.5'>
                        <div className='text-sm	font-medium'>{session?.user.name}</div>
                        <div className='text-13 text-999 mt-1'>{session?.user.email}</div>
                    </div>
                    <div className='py-1.5 px-3.5 text-sm text-999 border-y border-solid border-border-primary'>Personal</div>
                    <div className='py-1.5 px-3.5 text-sm transition duration-150 ease hover:bg-color-secondary'>
                        <button
                            className='w-full text-left'
                            onClick={() => {
                                signOut();
                            }}>
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
