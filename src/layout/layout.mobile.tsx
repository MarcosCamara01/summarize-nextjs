'use client';

import React, { PropsWithChildren, memo } from 'react';
import { NavbarAuth } from '@/components/common/mobile/NavbarAuth';

export default memo(({ children }: PropsWithChildren) => {
    return (
        <div
            className="sm:flex block justify-between"
        >
            <NavbarAuth />
            <main
                className="w-full min-h-screen absolute top-0 right-0 z-[-1]"
            >
                {children}
            </main>
        </div>
    )
});