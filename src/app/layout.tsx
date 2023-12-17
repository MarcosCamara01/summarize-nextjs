import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import Providers from "./Providers";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/auth";

import './globals.css'
import { Navbar } from '@/components/common/Navbar';

export const metadata: Metadata = {
  title: 'Summarize APP',
  description: 'Summarize app using OpenAI API and Vercel AI SDK',
}

export default async function RootLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Providers>
        <body className={GeistSans.className}>
          {
            session !== null ?
              <>
                {props.children}
                {props.modal}
              </>
              :
              <>
                <Navbar />
                {props.children}
              </>
          }
        </body>
      </Providers>
    </html>
  )
}
