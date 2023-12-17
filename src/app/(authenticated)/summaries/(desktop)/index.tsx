import React from 'react';
import { Summaries } from '@/components/summary/Summaries';
import { Title } from '@/components/common/Title';
import { getSummaries } from '@/helpers/getSummaries';
import Layout from '../../../../layout/layout.desktop';

const DesktopPage = async () => {
    const summaries = await getSummaries();

    return (
        <Layout>
            <Title
                title='Your summaries'
            />

            <section className='py-12 px-3.5 min-[350px]:px-6 sm:px-12'>
                <Summaries
                    summaries={summaries}
                />
            </section>
        </Layout>
    )
}

export default DesktopPage;
