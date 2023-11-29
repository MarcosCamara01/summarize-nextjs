import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "./Providers";
import { Sidebar } from '@/components/Sidebar';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Summarize APP',
  description: 'Summarize app using OpenAI API and Vercel AI SDK',
}

export default function RootLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Sidebar />
          <main>
            {props.children}
            {props.modal}
          </main>
        </body>
      </Providers>
    </html>
  )
}
