import React from 'react';
import { Summaries } from '@/components/summary/Summaries';
import { Title } from '@/components/common/Title';
import { getSummaries } from '@/helpers/getSummaries';

const SummariesPage = async () => {
  const summaries = await getSummaries();

  return (
    <>
      <Title
        title='Your summaries'
      />

      <section className='py-12 px-3.5 min-[350px]:px-6 sm:px-12'>
        <Summaries
          summaries={summaries}
        />
      </section>
    </>
  )
}

export default SummariesPage;
