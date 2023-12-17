"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useResponsive } from 'antd-style';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isNavbarOpen, setisNavbarOpen] = useState(false);
    const { mobile } = useResponsive();

    const isMobile = !!mobile;

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen, isNavbarOpen, setisNavbarOpen, isMobile }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
