"use client"

import React, { createContext, useContext, useState } from 'react';

const SummariesContext = createContext();

export function SummariesProvider({ children }) {
    const [summariesList, setSummariesList] = useState([]);

    return (
        <SummariesContext.Provider value={{ summariesList, setSummariesList }}>
            {children}
        </SummariesContext.Provider>
    );
}

export const useSummary = () => {
    return useContext(SummariesContext);
}