"use client"

import { createUserKey } from '@/helpers/UserKey';
import React, { useEffect, useRef, useState } from 'react';

export const NewUser = ({ isMobile }: { isMobile: boolean }) => {
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);
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
    }, []);

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

    const handleCreate = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        try {

            const response = await createUserKey(apiKey)

            if (response === 200) {
                setApiKey(undefined);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='h-[100vh] md:mt-0 md:h-sreen w-full block md:flex itemms-center justify-center relative'>
                <h1 className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold'>
                    ¿Qué vas a elegir?
                </h1>
                <div
                    className='w-full md:w-[50%] h-[54%] md:h-screen bg-black border-b md:border-r md:border-b-0 border-solid border-border-primary'
                >
                    <button className='w-full h-[54%] md:h-screen transition duration-150 ease hover:bg-color-secondary'>
                        Pay
                    </button>
                </div>
                <div
                    className='w-full md:w-[50%] h-[46%] md:h-screen bg-black'
                >
                    <button
                        className='w-full h-[46%] md:h-screen transition duration-150 ease hover:bg-color-secondary'
                        onClick={() => setApiKey("empty")}
                    >
                        Use OpenAI Key
                    </button>
                </div>
            </div>

            {apiKey !== undefined && (
                <div className='fixed w-full h-screen z-10 left-0 right-0 top-0 bottom-0 bg-black/80'>
                    <div className='w-full max-w-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 min-[350px]:px-6 sm:px-0'>
                        <div
                            className='bg-black border border-solid border-border-primary rounded overflow-hidden'
                            ref={ref}
                        >
                            <h4 className='px-5 pt-5 pb-3 text-base font-semibold'>Add yyour API key</h4>
                            <div className='mx-5 mb-3'>
                                <input
                                    type="text"
                                    className='w-3/4 p-1.5 bg-background-secondary border-t border-b border-l border-solid border-border-primary rounded-l-sm text-13	'
                                    value={apiKey === "empty" ? "" : apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                                <button
                                    onClick={(e) => handleCreate(e)}
                                    className='w-1/4 py-1.5 px-3.5 bg-background-secondary border border-solid border-border-primary rounded-r-sm text-13 transition duration-150 ease hover:bg-color-secondary'
                                >
                                    Create
                                </button>
                            </div>

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
    );
};
