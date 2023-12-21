'use client';

import { getUserKey } from '@/helpers/UserKey';
import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

const Redirect = memo(() => {
    const router = useRouter();

    const userKeyExist = async () => {
        const userKey = await getUserKey();

        if (!userKey) {
            router.push('/usage-options');
        }
    }

    useEffect(() => {
        userKeyExist();
    }, []);

    return null;
});

export default Redirect;