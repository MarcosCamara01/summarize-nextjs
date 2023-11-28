"use client"

import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { HiMiniBars2 } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const isMobile = useClientMediaQuery('(max-width: 640px)');

  useEffect(() => {
    if (isHeaderOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHeaderOpen]);

  const toggleHeader = () => {
    if (isMobile) {
      setIsHeaderOpen(!isHeaderOpen);
    }
  };

  const linksData = [
    { path: '/summaries', name: 'SUMMARIES' },
    { path: '/create', name: 'CREATE' },
  ];

  const headerStyles = "w-full px-3.5 xs:px-6 sm:px-12 py-10 flex items-center justify-between bg-background-secondary border-b border-solid border-border-primary";

  const authLinks = (
    <>
      {
        status === "loading" ?
          <div className='h-5 rounded-sm w-14 shine'></div>
          :
          status === "authenticated" ? (
            <li className='flex items-center justify-center'>
              <Link
                href="/account"
                onClick={toggleHeader}
              >{session.user.name?.split(' ')[0]}
              </Link>
            </li>
          ) : (
            <li className='flex items-center justify-center'>
              <Link
                href="/login"
                onClick={toggleHeader}
              >Login
              </Link>
            </li>
          )
      }
    </>
  );

  if (isMobile === null) {
    return <header className={headerStyles}>
      <div className='h-6 w-3/12 rounded-sm shine'></div>
      <div className='h-6	w-3/12 rounded-sm shine'></div>
    </header>;
  }

  return (
    <header className={headerStyles}>
      {isMobile ? (
        <>
          <button onClick={toggleHeader}>
            <HiMiniBars2 className="text-2xl" />
          </button>
          <ul className='flex justify-between gap-9	text-sm'>
            {authLinks}
          </ul>

          <div className={`fixed top-0 left-0 h-screen w-full bg-black py-10 px-3.5 xs:px-6 transition ease duration-200 z-20	 ${isHeaderOpen ? 'translate-x-0' : 'translate-x-hide'}`}>
            <ul className='flex justify-between gap-9	text-sm'>
              <button onClick={toggleHeader}>
                <HiMiniXMark className="text-2xl" />
              </button>
            </ul>

            <div className='h-5/6 my-10	flex items-center justify-center'>
              <ul className='flex flex-col justify-between gap-9 text-sm'>
                {linksData.map((link, index) => (
                  <li key={index} className='flex items-center justify-center'>
                    <Link href={link.path} onClick={toggleHeader}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <ul className='flex justify-between gap-9	text-sm'>
            {linksData.map((link, index) => (
              <li key={index} className='flex items-center justify-center'>
                <Link href={link.path} onClick={toggleHeader}>{link.name}</Link>
              </li>
            ))}
          </ul>
          <ul className='flex justify-between gap-9	text-sm'>
            {authLinks}
          </ul>
        </>
      )}
    </header>
  )
}
