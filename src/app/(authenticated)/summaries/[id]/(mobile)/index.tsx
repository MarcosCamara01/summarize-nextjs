import React from 'react';
import { getSingleSummary } from '@/helpers/getSummaries';
import Layout from '../../../../../layout/layout.mobile';
import { Summary } from '@/components/summary/Summary';

const MobilePage = async ({ summaryId }: { summaryId: string }) => {
    const summary = await getSingleSummary(summaryId);

    return (
        <Layout>
            <section className="w-full py-12 px-3.5 min-[350px]:px-6 sm:px-12 flex justify-center mt-16 sm:mt-0">
                <div className="max-w-5xl mx-auto">
                    <Summary summary={summary} />
                </div>
            </section>
        </Layout>
    )
}

export default MobilePage;
