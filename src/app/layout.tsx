import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import Providers from "./Providers";
import FlexMain from '@/components/common/FlexMain';

import './globals.css'


export const metadata: Metadata = {
  title: 'Summarize APP',
  description: 'Summarize app using OpenAI API and Vercel AI SDK',
}

export default function RootLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={GeistSans.className}>
          <FlexMain>
            {props.children}
            {props.modal}
          </FlexMain>
        </body>
      </Providers>
    </html>
  )
}
