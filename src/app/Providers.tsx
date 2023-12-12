"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from '../hooks/SidebarContext';
import { SummariesProvider } from '../hooks/SummariesContext';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <SummariesProvider>
          {children}
        </SummariesProvider>
      </SidebarProvider>
    </SessionProvider>
  );
}
