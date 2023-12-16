"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useResponsive } from 'antd-style';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { mobile } = useResponsive();

    const isMobile = !!mobile;

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
