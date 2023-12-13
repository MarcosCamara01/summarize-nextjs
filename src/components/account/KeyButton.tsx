import React, { useState, useEffect, useRef } from 'react';
import { RiLockLine } from "react-icons/ri";
import { getUserKey, updateUserKey } from '@/helpers/UserKeyFunctions';

interface KeyButtonProps {
    isSidebarOpen: boolean;
    isMobile: boolean;
}

export function KeyButton({ isSidebarOpen, isMobile }: KeyButtonProps) {
    const [toEdit, setToEdit] = useState<string | undefined>(undefined);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setToEdit(undefined);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (toEdit !== undefined && isMobile) {
            document.body.style.overflow = 'hidden';
        } else if (toEdit !== undefined && !isMobile) {
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
    }, [toEdit, isMobile]);

    const handleUpdate = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        try {

            const response = await updateUserKey(toEdit)

            if (response === 200) {
                setToEdit(undefined);
            }

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <li className='rounded w-full transition duration-150 ease hover:bg-color-secondary'>
                <button
                    className='w-full h-8 p-1.5 flex items-center gap-3'
                    onClick={async () => {
                        const userKey = await getUserKey()
                        if (userKey) {
                            setToEdit(userKey);
                        }
                    }}
                >
                    <RiLockLine className="text-xl min-w-[20px]" />
                    <span
                        className={`text-sm transition-opacity duration-150 delay-100 ease-in-out 
                                    ${!isMobile ? isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible" : ""}`}
                    >
                        Your API key
                    </span>
                </button>
            </li>

            {toEdit !== undefined && (
                <div className='fixed w-full h-screen z-10 left-0 right-0 top-0 bottom-0 bg-black/80'>
                    <div className='w-full max-w-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 min-[350px]:px-6 sm:px-0'>
                        <div
                            className='bg-black border border-solid border-border-primary rounded overflow-hidden'
                            ref={ref}
                        >
                            <h4 className='px-5 pt-5 pb-3 text-base font-semibold'>Your API key</h4>
                            <div className='mx-5 mb-3'>
                                <input
                                    type="text"
                                    className='w-3/4 p-1.5 bg-background-secondary border-t border-b border-l border-solid border-border-primary rounded-l-sm text-13	'
                                    value={toEdit === "empty" ? "" : toEdit}
                                    onChange={(e) => setToEdit(e.target.value)}
                                />
                                <button
                                    onClick={(e) => handleUpdate(e)}
                                    className='w-1/4 py-1.5 px-3.5 bg-background-secondary border border-solid border-border-primary rounded-r-sm text-13 transition duration-150 ease hover:bg-color-secondary'
                                >
                                    Update
                                </button>
                            </div>

                            <button
                                className='text-sm w-full h-8 flex items-center justify-center bg-black border-t border-solid border-border-primary transition duration-150 ease hover:bg-color-secondary'
                                onClick={() => {
                                    setToEdit(undefined);
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
