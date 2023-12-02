"use client"

import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const UpdateButton = ({ text }: { text: string }) => {
    const { data: session, update } = useSession();
    const [toEdit, setToEdit] = useState({ field: 'none', value: 'none' });
    const isMobile = useClientMediaQuery('(max-width: 600px)');

    useEffect(() => {
        if (toEdit.field !== 'none' && isMobile) {
            document.body.style.overflow = 'hidden';
        } else if (toEdit.field !== 'none' && !isMobile) {
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
            update({ [toEdit.field]: toEdit.value });

            const response = await axios.put('/api/auth/signup', {
                userId: session?.user._id,
                [toEdit.field]: toEdit.value,
            });
            console.log(response, [toEdit.field], toEdit.value);

            setToEdit({ field: 'none', value: 'none' });
        } catch (error) {
            console.error(error);
        }
    };

    const cellButtonStyles = "flex justify-between items-center rounded p-2.5 transition duration-150 ease hover:bg-color-secondary";
    const cellLeftStyles = "flex justify-between flex-col items-start gap-1 text-sm";
    const spanLeftStyles = "text-color-tertiary text-13 mt-1";
    const svgStyles = "text-xl";

    return (
        <>
            <button
                className={cellButtonStyles}
                onClick={() =>
                    setToEdit({ field: text, value: (session?.user && session.user[text as keyof typeof session.user])})
                }
            >
                <div className={cellLeftStyles}>
                    <h4 className={text === "api" ? "uppercase" : "capitalize"}>{text}</h4>
                    <span className={spanLeftStyles}>{session?.user && session.user[text as keyof typeof session.user]}</span>
                </div>
                <div>
                    <IoIosArrowForward className={svgStyles} />
                </div>
            </button>

            {toEdit.field !== "none" && (
                <div className='w-full h-screen fixed top-0 right-0 flex items-center justify-center bg-background-alert z-10'>
                    <div className='max-w-90 bg-black border border-solid border-border-primary rounded overflow-hidden min-w-250'>
                        <h4 className='px-5 pt-5 pb-3 text-base font-semibold'>Update <span className={text === "api" ? "uppercase" : "capitalize"}>{text}</span></h4>
                        <div className='mx-5 mb-3'>
                            <input
                                type="text"
                                className='w-4/6 p-1.5 bg-background-secondary border-t border-b border-l border-solid border-border-primary rounded-l-sm text-13	'
                                value={toEdit.value}
                                onChange={(e) => setToEdit({ ...toEdit, value: e.target.value })}
                            />
                            <button
                                onClick={(e) => handleUpdate(e)}
                                className='w-2/6 py-1.5 px-3.5 bg-background-secondary border border-solid border-border-primary rounded-r-sm text-13 transition duration-150 ease hover:bg-color-secondary'
                            >
                                Update
                            </button>
                        </div>

                        <button
                            className='text-sm w-full h-8 flex items-center justify-center bg-black border-t border-solid border-border-primary transition duration-150 ease hover:bg-color-secondary'
                            onClick={() => {
                                setToEdit({ field: 'none', value: 'none' });
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
