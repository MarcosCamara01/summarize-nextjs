"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useClientMediaQuery } from './useClientMediaQuery';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = useClientMediaQuery('(max-width: 640px)');

    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isMobile, setSidebarOpen]);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen, isMobile }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
