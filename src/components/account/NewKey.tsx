"use client"

import { createUserKey } from '@/helpers/UserKey';
import React, { useState } from 'react';
import FixedComponent from '../common/FixedComponent';

export const NewKey = ({ isMobile }: { isMobile: boolean }) => {
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);

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
                <h1 
                className='absolute top-[54%] md:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 text-center text-3xl font-bold bg-black px-5 py-2 rounded border border-solid border-border-primary'
                >
                    ¿Qué vas a elegir?
                </h1>
                <div
                    className='w-full md:w-[50%] h-[54%] md:h-screen bg-black border-b md:border-r md:border-b-0 border-solid border-border-primary'
                >
                    <button className='w-full h-full md:h-screen transition duration-150 ease hover:bg-color-secondary'>
                        Pay
                    </button>
                </div>
                <div
                    className='w-full md:w-[50%] h-[46%] md:h-screen bg-black'
                >
                    <button
                        className='w-full h-full md:h-screen transition duration-150 ease hover:bg-color-secondary'
                        onClick={() => setApiKey("empty")}
                    >
                        Use OpenAI Key
                    </button>
                </div>
            </div>

            <FixedComponent
                isMobile={isMobile}
                apiKey={apiKey}
                setApiKey={setApiKey}
            >

                <h4 className='px-5 pt-5 pb-3 text-base font-semibold'>Add your API key</h4>
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
            </FixedComponent>


        </>
    );
};
