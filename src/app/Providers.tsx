"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from '../hooks/SidebarContext';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}
