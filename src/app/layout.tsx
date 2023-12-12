import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import Providers from "./Providers";

import './globals.css'

export const metadata: Metadata = {
  title: 'Summarize APP',
  description: 'Summarize app using OpenAI API and Vercel AI SDK',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={GeistSans.className}>
          {props.children}
        </body>
      </Providers>
    </html>
  )
}
