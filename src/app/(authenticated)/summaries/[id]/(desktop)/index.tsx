import React from 'react';
import { getSingleSummary } from '@/helpers/getSummaries';
import Layout from '../../../../../layout/layout.desktop';
import { Summary } from '@/components/summary/Summary';

const DesktopPage = async ({ summaryId }: { summaryId: string }) => {
    const summary = await getSingleSummary(summaryId);

    return (
        <Layout>
            <section className="w-full pt-24 pb-12 px-3.5 min-[350px]:px-6 sm:px-12 flex justify-center">
                <div className="max-w-5xl mx-auto">
                    <Summary summary={summary} />
                </div>
            </section>
        </Layout>
    )
}

export default DesktopPage;
