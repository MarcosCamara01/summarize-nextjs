'use client'

import React, { useEffect, useRef } from 'react';

interface FixedComponentProps {
    children: React.ReactNode;
    isMobile: boolean;
    apiKey: string | undefined;
    setApiKey: any;
}

export default function FixedComponent({ children, isMobile, apiKey, setApiKey }: FixedComponentProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setApiKey(undefined);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    useEffect(() => {
        if (apiKey !== undefined && isMobile) {
            document.body.style.overflow = 'hidden';
        } else if (apiKey !== undefined && !isMobile) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '17px';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
        };
    }, [apiKey, isMobile]);

    return (
        <>
            {apiKey !== undefined && (
                <div className='fixed w-full h-screen z-10 left-0 right-0 top-0 bottom-0 bg-black/80'>
                    <div className='w-full max-w-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 min-[350px]:px-6 sm:px-0'>
                        <div
                            className='bg-black border border-solid border-border-primary rounded overflow-hidden'
                            ref={ref}
                        >
                            {children}

                            <button
                                className='text-sm w-full h-8 flex items-center justify-center bg-black border-t border-solid border-border-primary transition duration-150 ease hover:bg-color-secondary'
                                onClick={() => {
                                    setApiKey(undefined);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}