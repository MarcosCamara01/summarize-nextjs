import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "./Providers";
import { Navbar } from "@/components/Navbar";

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Summarize APP',
  description: 'Summarize app using OpenAI API and Vercel AI SDK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Navbar />
          <main>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
