"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from '../hooks/SidebarContext';
import { SummariesProvider } from '../hooks/SummariesContext';
import { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  session: Session
}

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <SummariesProvider>
          {children}
        </SummariesProvider>
      </SidebarProvider>
    </SessionProvider>
  );
}
