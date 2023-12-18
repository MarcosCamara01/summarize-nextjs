'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

const Redirect = memo(() => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/overview');
        } else if (status === "unauthenticated") {
            router.push('/home');
        }
    }, [status]);

    return null;
});

export default Redirect;