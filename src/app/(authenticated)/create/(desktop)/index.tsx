import React from 'react';
import { Title } from '@/components/common/Title';
import Layout from '../../../../layout/layout.desktop';
import CreateSummary from '@/components/create/CreateSummary';

const DesktopPage = async () => {
    return (
        <Layout>
            <Title
                title='Create a summary'
            />

            <section className="w-full min-h-[87vh] sm:min-h-[94vh] flex flex-col items-center justify-center">
                <CreateSummary />
            </section>
        </Layout>
    )
}

export default DesktopPage;
