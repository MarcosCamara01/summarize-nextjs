import React, { useState } from 'react';
import { RiLockLine } from "react-icons/ri";
import { getUserKey, updateUserKey } from '@/helpers/UserKey';
import FixedComponent from '../common/FixedComponent';

interface KeyButtonProps {
    isSidebarOpen: boolean;
    isMobile: boolean;
}

export function KeyButton({ isSidebarOpen, isMobile }: KeyButtonProps) {
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);

    const handleUpdate = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        try {

            const response = await updateUserKey(apiKey)

            if (response === 200) {
                setApiKey(undefined);
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
                            setApiKey(userKey.apiKey);
                        }
                    }}
                >
                    <RiLockLine className="text-xl min-w-[20px]" />
                    <span
                        className={`text-sm transition-opacity duration-150 delay-100 ease-in-out 
                                    ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    >
                        Your API key
                    </span>
                </button>
            </li>

            <FixedComponent
                isMobile={isMobile}
                apiKey={apiKey}
                setApiKey={setApiKey}
            >

                <h4 className='px-5 pt-5 pb-3 text-base font-semibold'>Your API key</h4>
                <div className='mx-5 mb-3'>
                    <input
                        type="text"
                        className='w-3/4 p-1.5 bg-background-secondary border-t border-b border-l border-solid border-border-primary rounded-l-sm text-13	'
                        value={apiKey === "empty" ? "" : apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                    <button
                        onClick={(e) => handleUpdate(e)}
                        className='w-1/4 py-1.5 px-3.5 bg-background-secondary border border-solid border-border-primary rounded-r-sm text-13 transition duration-150 ease hover:bg-color-secondary'
                    >
                        Update
                    </button>
                </div>
            </FixedComponent>
        </>
    )
}
