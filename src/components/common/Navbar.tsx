import Link from 'next/link'
import React from 'react'
import { PiBrain } from 'react-icons/pi'

export const Navbar = () => {
    return (
        <header className='fixed top-0 p-4 w-full flex items-center justify-between z-10 bg-black border-b border-solid border-border-primary'>
            <Link href="https://platform.openai.com/" target='_blank'>
                <PiBrain
                    className="text-3xl"
                />
            </Link>

            <ul className='flex justify-between gap-3'>
                <li>
                    <Link href="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/register">
                        Register
                    </Link>
                </li>
            </ul>
        </header>
    )
}
